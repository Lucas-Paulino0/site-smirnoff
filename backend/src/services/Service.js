const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async findAll() {
    return database[this.modelName].findAll();
  }

  async findOne(id) {
    return database[this.modelName].findOne({
      where: { id: id },
    });
  }

  async create(info) {
    return database[this.modelName].create(info);
  }

  async update(id, info) {
    return database[this.modelName].update(info, { where: { id: id } });
  }

  async delete(id) {
    return database[this.modelName].destroy({ where: { id: id } });
  }
}

module.exports = Services;
