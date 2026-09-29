const { Router } = require("express");
const PurchaseController = require("../controllers/PurchaseController");

const router = new Router();

router.post("/purchases", PurchaseController.createPurchase);
router.post("/purchases/approved", PurchaseController.getPurchases);
router.post(`/purchases/${process.env.WEBHOOK_ENDPOINT}`, PurchaseController.purchaseNotification);

module.exports = router;
