"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "category",
      });
    }
  }
  Category.init(
    {
      internalName: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Category",
    }
  );
  return Category;
};
