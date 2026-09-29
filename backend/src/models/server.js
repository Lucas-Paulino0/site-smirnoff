"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    static associate(models) {
      Server.hasMany(models.Product, {
        foreignKey: "server",
      });
    }
  }
  Server.init(
    {
      internalName: DataTypes.STRING,
      name: DataTypes.STRING,
      ip: DataTypes.STRING,
      image: DataTypes.STRING,
      video: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Server",
    }
  );
  return Server;
};
