const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const crypto = require('crypto');

// Sem idempotencyKey fixa: o SDK gera uma chave nova a cada requisição. Uma
// chave única para o processo inteiro faria o Mercado Pago devolver a mesma
// preferência (e o mesmo pedido) para compradores diferentes.
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
    integratorId: process.env.MP_INTEGRATOR_ID,
});

class MercadoPagoUtils {
  async createOrder(products){
    const preference = new Preference(client);

    const orderId = crypto.randomUUID();

    const body = {
        items: products,
        back_urls: {
            success: `${process.env.FRONTEND_URL}/compra/sucesso`,
            failure: `${process.env.FRONTEND_URL}/compra/erro`,
            pending: `${process.env.FRONTEND_URL}/compra/pendente`,
        },
        expires: false,
        // O Mercado Pago recusa auto_return com endereço local (localhost):
        // só volta sozinho para o site quando ele está publicado com https
        ...(process.env.FRONTEND_URL?.startsWith('https://') && { auto_return: 'all' }),
        notification_url: `${process.env.BASE_URL}/purchases/${process.env.WEBHOOK_ENDPOINT}`,
        payment_methods: {
            installments: 1,
        },
        external_reference: orderId,
    };

    const response = await preference.create({ body });
    return response;
  }
  async getOrder(orderId){
    const payment = new Payment(client);
    const response = await payment.get({ id: orderId });
    return response;
  }
}

module.exports = MercadoPagoUtils;
