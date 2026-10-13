const { Router } = require("express");
const PurchaseController = require("../controllers/PurchaseController");
const { purchaseLimiter, pluginAuthLimiter, webhookLimiter } = require("../middlewares/rateLimit");

const router = new Router();

router.post("/purchases", purchaseLimiter, PurchaseController.createPurchase);
router.post("/purchases/approved", pluginAuthLimiter, PurchaseController.getPurchases);

// Sem WEBHOOK_ENDPOINT a rota viraria /purchases/undefined, fácil de adivinhar
const webhook = process.env.WEBHOOK_ENDPOINT;
if (webhook && webhook.length >= 16 && /^[A-Za-z0-9_-]+$/.test(webhook)) {
  router.post(`/purchases/${webhook}`, webhookLimiter, PurchaseController.purchaseNotification);
} else {
  console.error(
    "WEBHOOK_ENDPOINT vazio, curto ou com caracteres inválidos: o webhook do Mercado Pago está desligado e nenhum pagamento será aprovado."
  );
}

module.exports = router;
