const { MercadoPagoUtils } = require("../utils");

const { ProductService } = require("../services");
const productService = new ProductService();

const { PurchaseService } = require("../services");
const purchaseService = new PurchaseService();

const mercadoPagoUtils = new MercadoPagoUtils();

// The username is later used by the in-game delivery (console commands), so
// only accept valid Minecraft nicknames.
const MINECRAFT_USERNAME = /^[A-Za-z0-9_]{3,16}$/;

// Status do Mercado Pago que desfazem uma compra
const REVERSED_STATUSES = ["refunded", "charged_back", "cancelled"];

// O Mercado Pago avisa em dois formatos: Webhooks ({ type, data: { id } } ou
// ?type=payment&data.id=) e IPN ({ topic, resource } ou ?topic=payment&id=).
// No IPN o resource pode vir como URL, então pega só o número do final.
const readPaymentNotification = (req) => {
  const body = req.body || {};
  const type = body.type || body.topic || req.query.type || req.query.topic;
  if (type !== "payment") return null;

  const raw = body.data?.id || req.query["data.id"] || body.resource || req.query.id;
  const match = String(raw ?? "").match(/(\d+)\/?$/);
  return match ? match[1] : null;
};

class PurchaseController {
  static async getPurchases(req, res) {
    const { authorization } = req.headers;

    const { delivered } = req.body;

    // Sem token configurado, "Bearer " vazio passaria na comparação
    if (!process.env.SECRET_ACCESS_TOKEN) {
      return res.status(503).json({ error: "SECRET_ACCESS_TOKEN not configured" });
    }

    if(authorization !== `Bearer ${process.env.SECRET_ACCESS_TOKEN}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      if (Array.isArray(delivered) && delivered.length > 0) {
        await purchaseService.setDelivered(delivered);
      }
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

      if (typeof username !== "string" || !MINECRAFT_USERNAME.test(username)) {
        throw new Error("Invalid username");
      }

      const products = await Promise.all(productIds.map(async (productId) => {
        const product = await productService.findOne(productId);
        if (!product) {
          throw new Error("Product not found");
        }

        // Preço 0 é produto sem preço definido: o Mercado Pago recusaria
        if (!product.enabled || !(product.price > 0)) {
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
          price: product.price,
        });
      }));

      return res.status(200).json({initPoint: preference.init_point});
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async purchaseNotification(req, res) {
    const paymentId = readPaymentNotification(req);

    // Outros avisos (merchant_order, testes do painel): só confirma o recebimento
    if (!paymentId) {
      return res.sendStatus(200);
    }

    try {
      // Nunca confia no corpo do aviso: consulta o pagamento na API
      const payment = await mercadoPagoUtils.getOrder(paymentId);
      const orderId = payment.external_reference;
      const purchases = orderId ? await purchaseService.findByOrderId(orderId) : [];

      if (purchases.length === 0) {
        return res.sendStatus(200);
      }

      if (payment.status === "approved") {
        const expected = purchases.reduce((sum, p) => sum + (p.price || 0), 0);
        if (payment.transaction_amount + 0.01 < expected) {
          console.error(
            `Pagamento ${paymentId} do pedido ${orderId} veio com R$ ${payment.transaction_amount}, esperado R$ ${expected}. Não aprovado.`
          );
          return res.sendStatus(200);
        }
        await purchaseService.approveOrder(orderId, String(paymentId));
      } else if (REVERSED_STATUSES.includes(payment.status)) {
        await purchaseService.refundOrder(orderId);
        if (purchases.some((p) => p.delivered)) {
          console.warn(
            `Pedido ${orderId} (${purchases[0].username}) foi ${payment.status} depois de entregue. Remova os itens no jogo.`
          );
        }
      }

      return res.sendStatus(200);
    } catch (error) {
      // 500 faz o Mercado Pago tentar de novo mais tarde
      console.error(`Erro ao processar o pagamento ${paymentId}:`, error.message);
      return res.sendStatus(500);
    }
  }
}
module.exports = PurchaseController;
