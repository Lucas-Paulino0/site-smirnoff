const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const { apiLimiter } = require("./middlewares/rateLimit");

const app = express();

// Em produção a API fica atrás do proxy da hospedagem (/api -> backend), então
// o IP do visitante vem no X-Forwarded-For. TRUST_PROXY é quantos proxies
// existem na frente (1 = só o da hospedagem; 2 = Cloudflare + hospedagem).
// Com um número maior que o real, qualquer um falsifica o IP e escapa do
// limite de requisições.
app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 1));
app.disable("x-powered-by");

// A API só devolve JSON e imagens: a CSP mais restrita possível. As imagens de
// /files são carregadas pelo site, que pode estar em outro endereço.
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Só o site pode chamar a API pelo navegador. O plugin e o Mercado Pago falam
// direto com o servidor e não passam pelo CORS.
const allowedOrigins = [process.env.FRONTEND_URL]
  .concat(process.env.NODE_ENV === "production" ? [] : ["http://localhost:5173"])
  .filter(Boolean)
  .map((url) => url.replace(/\/+$/, ""));
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"] }));

// Nenhuma rota recebe mais que uma lista de ids
app.use(express.json({ limit: "10kb" }));

app.use(
  "/files",
  express.static(path.join(__dirname, "files"), { index: false, dotfiles: "deny" })
);

app.use(apiLimiter);
routes(app);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Erros não tratados (JSON malformado, corpo grande demais...) nunca devolvem
// a mensagem interna ou o stack trace
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const status = error.status || error.statusCode || 500;
  if (status >= 500) {
    console.error(`${req.method} ${req.path}:`, error);
  }
  res.status(status).json({ error: status >= 500 ? "Internal server error" : "Bad request" });
});

module.exports = app;
