const { CategoryService } = require("../services");
const categoryService = new CategoryService();

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await categoryService.findAll();

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await categoryService.findByInternalName(req.params.name);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
}
module.exports = CategoryController;
