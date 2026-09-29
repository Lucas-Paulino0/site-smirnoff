const Service = require("./Service");
const database = require("../models");

class CategoryService extends Service {
  constructor() {
    super("Category");
  }

    async findByInternalName(internalName) {
      const result = await database[this.modelName].findOne({
        where: { internalName: internalName },
      });

      if (!result) {
        throw new Error("Category not found");
      }

      return result;
    }
}

module.exports = CategoryService;
