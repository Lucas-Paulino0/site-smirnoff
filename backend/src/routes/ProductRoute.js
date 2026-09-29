const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const router = new Router();

router.get("/products/:server", ProductController.getProductsByServer);
router.get("/products/:server/:category", ProductController.getProductsByServerCategory);

module.exports = router;
