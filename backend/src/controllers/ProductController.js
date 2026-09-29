const { ProductService } = require("../services");
const productService = new ProductService();

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await productService.findAllForStore();

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async getProductsByCategory(req, res) {
    try {
      const products = await productService.findAllByCategory(req.params.category);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = ProductController;
