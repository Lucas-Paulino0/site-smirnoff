const Service = require("./Service");
const database = require("../models");
const { Op } = require("sequelize");

class PurchaseService extends Service {
  constructor() {
    super("Purchase");
  }

  // Compras pagas que o plugin ainda não entregou
  async findAll() {
    return database[this.modelName].findAll(
      {
        include: { all: true },
        attributes: ["id", "username"],
        where: {approved: true, delivered: false, refunded: false},
      }
    );
  }

  async findByOrderId(orderId) {
    return database[this.modelName].findAll({ where: { orderId } });
  }

  // Só mexe nos itens ainda não aprovados, para não sobrescrever a data da
  // primeira aprovação quando o Mercado Pago reenvia a notificação.
  async approveOrder(orderId, paymentId) {
    return database[this.modelName].update(
      { approved: true, paymentId, approvedDate: new Date() },
      { where: { orderId, approved: false, refunded: false } }
    );
  }

  // Tira da fila de entrega o que ainda não foi entregue. O que já foi
  // entregue fica marcado como refunded para a equipe resolver no jogo.
  async refundOrder(orderId) {
    await database[this.modelName].update(
      { approved: false, refunded: true },
      { where: { orderId, delivered: false } }
    );
    await database[this.modelName].update(
      { refunded: true },
      { where: { orderId, delivered: true } }
    );
  }

  async setDelivered(ids){
    return database[this.modelName].update({delivered: true}, { where: { id: { [Op.in]: ids } } });
  }
}

module.exports = PurchaseService;
