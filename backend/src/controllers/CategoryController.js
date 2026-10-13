const { CategoryService } = require("../services");
const categoryService = new CategoryService();

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await categoryService.findAll();

      return res.status(200).json(categories);
    } catch (error) {
      console.error("Erro ao listar as categorias:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await categoryService.findByInternalName(req.params.name);

      return res.status(200).json(category);
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ error: error.message });
      }
      console.error("Erro ao buscar a categoria:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = CategoryController;
