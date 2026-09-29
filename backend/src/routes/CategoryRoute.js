const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = new Router();

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:name", CategoryController.getCategory);

module.exports = router;
