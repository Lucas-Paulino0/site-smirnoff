const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const crypto = require('crypto');

const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN, 
    integratorId: process.env.MP_INTEGRATOR_ID,
    options: {  idempotencyKey: crypto.randomUUID() } }
);

class MercadoPagoUtils {
  async createOrder(products){
    const preference = new Preference(client);

    const orderId = crypto.randomUUID();

    console.log(process.env.BASE_URL);

    const body = {
        items: products,
        back_urls: {
            success: 'https://redecosmo.com.br/compra/sucesso',
            failure: 'https://redecosmo.com.br/compra/erro',
            pending: 'https://redecosmo.com.br/compra/pendente',
        },
        expires: false,
        auto_return: 'all',
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
