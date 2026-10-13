const { rateLimit } = require("express-rate-limit");

const tooMany = { error: "Too many requests" };

// Limite geral por IP. Uma visita à loja faz umas 20 requisições (status,
// categorias, produtos e as imagens), então sobra bastante para quem navega.
// O plugin de entrega tem o próprio limite.
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 600,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: tooMany,
  skip: (req) => req.path === "/purchases/approved",
});

// Cada pedido cria uma preferência no Mercado Pago e linhas no banco
const purchaseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: tooMany,
});

// Só as tentativas com token errado contam: o plugin, que consulta a cada 30s,
// nunca é barrado, e quem tenta adivinhar o token é.
const pluginAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: tooMany,
  skipSuccessfulRequests: true,
});

// Cada aviso faz uma consulta à API do Mercado Pago
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: tooMany,
});

module.exports = { apiLimiter, purchaseLimiter, pluginAuthLimiter, webhookLimiter };
