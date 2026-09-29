"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      Purchase.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Purchase.init(
    {
      orderId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      username: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      approved: DataTypes.BOOLEAN,
      approvedDate: DataTypes.DATE,
      delivered: DataTypes.BOOLEAN,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
