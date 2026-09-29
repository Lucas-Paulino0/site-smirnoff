const { MercadoPagoUtils } = require("../utils");

const { ProductService } = require("../services");
const productService = new ProductService();

const { PurchaseService } = require("../services");
const purchaseService = new PurchaseService();

const mercadoPagoUtils = new MercadoPagoUtils();

class PurchaseController {
  static async getPurchases(req, res) {
    const { authorization } = req.headers;

    const { delivered } = req.body;

    if(authorization !== `Bearer ${process.env.SECRET_ACCESS_TOKEN}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      await purchaseService.setDelivered(delivered);
      const purchases = await purchaseService.findAll();
      return res.status(200).json(purchases);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async createPurchase(req, res) {
    try {
      const { username, productIds } = req.body;

      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        throw new Error("Invalid productIds");
      }

      if (!username || typeof username !== "string" || username.length === 0) {
        throw new Error("Invalid username");
      }

      const products = await Promise.all(productIds.map(async (productId) => {
        const product = await productService.findOne(productId);
        if (!product) {
          throw new Error("Product not found");
        }

        if (!product.enabled) {
          throw new Error("Product not enabled");
        }

        return product;
      }));

      const preferenceProducts = products.map((product) => ({
        title: product.name,
        quantity: 1,
        currency_id: "BRL",
        unit_price: product.price,
      }));

      const preference = await mercadoPagoUtils.createOrder(preferenceProducts);

      await Promise.all(products.map(async (product) => {
        await purchaseService.create({
          orderId: preference.external_reference,
          username,
          purchaseDate: new Date(),
          approved: false,
          approvedDate: null,
          productId: product.id,
        });
      }));

      return res.status(200).json({initPoint: preference.init_point});
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async purchaseNotification(req, res) {
    try {
      const {resource, topic} = req.body;

      if (topic !== "payment") {
        return res.sendStatus(200);
      }

      const order = await mercadoPagoUtils.getOrder(resource);

      if(order.status === "approved"){
        await purchaseService.updateByOrderId(order.external_reference, 
          {
            approved: true, 
            paymentId: resource,
            approvedDate: new Date()
          }
        );
      }

      return res.status(200).json({message: order});
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = PurchaseController;
