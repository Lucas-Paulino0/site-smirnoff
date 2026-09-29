const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const router = new Router();

router.get("/products", ProductController.getProducts);
router.get("/products/category/:category", ProductController.getProductsByCategory);

module.exports = router;
