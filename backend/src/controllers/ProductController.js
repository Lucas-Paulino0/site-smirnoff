const { ProductService } = require("../services");
const productService = new ProductService();

class ProductController {
  static async getProductsByServer(req, res) {
    try {
      const products = await productService.findAllByServer(req.params.server);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
  static async getProductsByServerCategory(req, res) {
    try {
      const products = await productService.findAllByServerCategory(req.params.server, req.params.category);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
}
module.exports = ProductController;
