// Renders dos modelos 3D do servidor para a wiki: chefes, um monstro de cada
// família e os itens fabricados que não têm ícone plano.
//
// 1. Baixe do servidor (SFTP, só leitura; ver hail-admin-kit) para uma pasta
//    FORA do repositório (os modelos são de pacotes comprados):
//    - plugins/BetterModel/models/<Pacote>/<modelo>.bbmodel -> <pasta>/<Pacote>/<modelo>.bbmodel
//    - plugins/Nexo/pack/assets/rpgjobs/models/crafted/*.json -> <pasta>/itens/modelos/
//    - plugins/Nexo/pack/assets/rpgjobs/textures/crafted/*.png -> <pasta>/itens/texturas/
//    Os modelos usados por cada página estão em modelos.json.
// 2. node scripts/render-modelos/renderizar.mjs <pasta> [chefes/enganadora ...]
//    Renderiza no Edge headless (three.js) em <pasta>/renders/.
// 3. python scripts/render-modelos/finalizar.py <pasta>
//    Recorta e grava em public/chefes, public/monstros e public/itens/3d.
// 4. Rode o gerar-profissoes.py de novo para os itens apontarem para os renders.

import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const [folderArg, ...only] = process.argv.slice(2);
if (!folderArg) {
  console.error("Uso: node scripts/render-modelos/renderizar.mjs <pasta-dos-modelos> [chefes/<slug> ...]");
  process.exit(1);
}
const tool = import.meta.dirname;
const folder = resolve(folderArg);
const list = JSON.parse(readFileSync(join(tool, "modelos.json"), "utf-8"));

const jobs = [];
for (const group of ["chefes", "monstros"]) {
  for (const [slug, entry] of Object.entries(list[group])) {
    const query = new URLSearchParams({ size: "1024", yaw: "30", pitch: "8", anim: entry.animacao ?? "idle" });
    jobs.push({ key: `${group}/${slug}`, page: "chefe.html", model: `/modelos/${entry.modelo}.bbmodel`, query });
  }
}
for (const [slug, id] of Object.entries(list.itens)) {
  jobs.push({ key: `itens/${slug}`, page: "item.html", model: `/modelos/itens/modelos/${id}.json`, query: new URLSearchParams({ size: "512" }) });
}
const selected = only.length ? jobs.filter((job) => only.includes(job.key)) : jobs;

const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".bbmodel": "application/json", ".png": "image/png" };
const server = createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const base = url.startsWith("/modelos/") ? folder : tool;
  const path = normalize(join(base, url.replace(/^\/modelos\//, "/")));
  if (!path.startsWith(base)) return res.writeHead(403).end();
  try {
    const body = readFileSync(path);
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(3591);

const edge = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = spawn(edge, [
  "--headless=new",
  "--enable-unsafe-swiftshader",
  "--use-angle=swiftshader",
  "--remote-debugging-port=9334",
  `--user-data-dir=${join(process.env.TEMP ?? folder, "render-modelos-perfil")}`,
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  try {
    target = (await (await fetch("http://127.0.0.1:9334/json")).json()).find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(200);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
let pageError = null;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
  if (msg.method === "Runtime.exceptionThrown") pageError = msg.params.exceptionDetails.exception?.description;
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, returnByValue: true })).result.result?.value;

await send("Runtime.enable");
let failed = 0;
for (const job of selected) {
  pageError = null;
  job.query.set("model", job.model);
  await send("Page.navigate", { url: `http://127.0.0.1:3591/${job.page}?${job.query}` });
  let data;
  for (let i = 0; i < 200 && !data && !pageError; i++) {
    await sleep(150);
    data = await evaluate("window.RESULT");
  }
  if (!data) {
    failed++;
    console.log("FALHOU", job.key, pageError?.split("\n")[0] ?? "(sem resposta)");
    continue;
  }
  const out = join(folder, "renders", `${job.key}.png`);
  mkdirSync(join(out, ".."), { recursive: true });
  writeFileSync(out, Buffer.from(data.split(",")[1], "base64"));
  const note = await evaluate("window.NOTE");
  console.log("ok", job.key, note ? `(${note})` : "");
}
console.log(`${selected.length - failed} de ${selected.length} renders em ${join(folder, "renders")}`);
ws.close();
browser.kill();
server.close();
process.exit(failed ? 1 : 0);
