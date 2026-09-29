const Service = require("./Service");
const database = require("../models");

class ProductService extends Service {
  constructor() {
    super("Product");
  }

  async findOne(id) {
    const result = await database[this.modelName].scope("allAttributes").findOne({
      where: { id: id },
    });

    return result;
  }

  async findAllForStore() {
    const result = await database[this.modelName].scope("allAttributes").findAll({
      order: [["enabled", "DESC"], ["price", "ASC"]],
    });

    return result;
  }

  async findAllByCategory(category) {
    const result = await database[this.modelName].scope("allAttributes").findAll({
      where: { category: category },
      order: [["enabled", "DESC"], ["price", "ASC"]],
    });

    return result;
  }
}

module.exports = ProductService;
