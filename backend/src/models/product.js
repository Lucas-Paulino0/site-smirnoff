"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category",
      });
      Product.hasMany(models.Purchase, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      internalName: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      items: DataTypes.STRING,
      price: DataTypes.FLOAT,
      enabled: DataTypes.BOOLEAN,
      category: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Product",
      defaultScope: {
        attributes: ["internalName"],
      },
      scopes: {
        allAttributes: {},
      },
    }
  );
  return Product;
};
