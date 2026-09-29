const Service = require("./Service");
const database = require("../models");
const { Op } = require("sequelize");

class PurchaseService extends Service {
  constructor() {
    super("Purchase");
  }

  async findAll() {
    return database[this.modelName].findAll(
      {
        include: { all: true },
        attributes: ["id", "username"],
        where: {approved: true, delivered: false},
      }
    );
  }

  async updateByOrderId(orderId, data) {
    return database[this.modelName].update(data, { where: { orderId } });
  }

  async setDelivered(ids){
    return database[this.modelName].update({delivered: true}, { where: { id: { [Op.in]: ids } } });
  }
}

module.exports = PurchaseService;
