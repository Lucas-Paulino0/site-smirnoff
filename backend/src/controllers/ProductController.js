const { ProductService } = require("../services");
const productService = new ProductService();

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await productService.findAllForStore();

      return res.status(200).json(products);
    } catch (error) {
      console.error("Erro ao listar os produtos:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getProductsByCategory(req, res) {
    // A coluna category é o id numérico da categoria
    if (!/^\d+$/.test(req.params.category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    try {
      const products = await productService.findAllByCategory(Number(req.params.category));

      return res.status(200).json(products);
    } catch (error) {
      console.error("Erro ao listar os produtos da categoria:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = ProductController;
