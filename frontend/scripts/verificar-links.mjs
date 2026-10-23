// Verificador de links: lê o sitemap de um site rodando, abre todas as
// páginas e confere os links internos (páginas que não abrem e #âncoras que
// não existem) e as imagens do próprio site.
//
//   npm run build && PORT=3519 npm start      (em outro terminal)
//   npm run verificar-links                    (ou: node scripts/verificar-links.mjs http://localhost:3519)
//
// Também funciona contra o site no ar: node scripts/verificar-links.mjs https://hail.halahost.net

const base = new URL(process.argv[2] ?? process.env.SITE ?? "http://localhost:3519");
const CONCURRENCY = 8;

const pages = new Map(); // caminho -> Promise<{ status, ids }>
const assets = new Map(); // caminho -> Promise<status>
const problems = [];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// limita quantos pedidos rodam ao mesmo tempo
let running = 0;
const queue = [];
function limited(task) {
  return new Promise((resolve, reject) => {
    const run = () => {
      running++;
      task()
        .then(resolve, reject)
        .finally(() => {
          running--;
          queue.shift()?.();
        });
    };
    running < CONCURRENCY ? run() : queue.push(run);
  });
}

function fetchPage(path) {
  if (!pages.has(path)) {
    pages.set(
      path,
      limited(async () => {
        try {
          const res = await fetch(new URL(path, base), { redirect: "follow" });
          const html = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
          const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decode(m[1])));
          return { status: res.status, html, ids };
        } catch (error) {
          return { status: `erro (${error.cause?.code ?? error.message})`, html: "", ids: new Set() };
        }
      })
    );
  }
  return pages.get(path);
}

function fetchAsset(path) {
  if (!assets.has(path)) {
    assets.set(
      path,
      limited(async () => {
        try {
          const res = await fetch(new URL(path, base), { method: "HEAD" });
          return res.status;
        } catch (error) {
          return `erro (${error.cause?.code ?? error.message})`;
        }
      })
    );
  }
  return assets.get(path);
}

// links internos de uma página: [href, caminho, âncora]
function internalLinks(html, from) {
  const links = [];
  for (const [, raw] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = decode(raw);
    if (/^(mailto|tel|javascript):/.test(href)) continue;
    const url = new URL(href, new URL(from, base));
    if (url.origin !== base.origin) continue;
    if (url.pathname.startsWith("/api")) continue;
    links.push([href, url.pathname + url.search, decodeURIComponent(url.hash.slice(1))]);
  }
  return links;
}

function internalImages(html, from) {
  const images = [];
  for (const [, raw] of html.matchAll(/<img\s[^>]*src="([^"]+)"/g)) {
    const url = new URL(decode(raw), new URL(from, base));
    if (url.origin === base.origin) images.push(url.pathname);
  }
  return images;
}

async function main() {
  const sitemap = await fetch(new URL("/sitemap.xml", base));
  if (!sitemap.ok) throw new Error(`/sitemap.xml respondeu ${sitemap.status}`);
  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(decode(m[1])).pathname);
  console.log(`${paths.length} páginas no sitemap de ${base.origin}`);

  let links = 0;
  let images = 0;
  await Promise.all(
    paths.map(async (path) => {
      const page = await fetchPage(path);
      if (page.status !== 200) {
        problems.push(`${path}: a página respondeu ${page.status}`);
        return;
      }
      await Promise.all([
        ...internalLinks(page.html, path).map(async ([href, target, hash]) => {
          links++;
          const linked = await fetchPage(target);
          if (linked.status !== 200) problems.push(`${path}: link "${href}" responde ${linked.status}`);
          else if (hash && !linked.ids.has(hash)) problems.push(`${path}: link "${href}" aponta para uma âncora que não existe`);
        }),
        ...internalImages(page.html, path).map(async (src) => {
          images++;
          const status = await fetchAsset(src);
          if (status !== 200) problems.push(`${path}: imagem "${src}" responde ${status}`);
        }),
      ]);
    })
  );

  const unique = [...new Set(problems)].sort();
  console.log(`${links} links e ${images} imagens conferidos (${pages.size} páginas e ${assets.size} imagens diferentes)`);
  if (unique.length === 0) {
    console.log("Nenhum link quebrado.");
    return;
  }
  console.log(`\n${unique.length} problemas:`);
  for (const problem of unique) console.log(`  ${problem}`);
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
