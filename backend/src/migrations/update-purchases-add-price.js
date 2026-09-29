"use strict";
// O nome começa com "update-" para rodar depois dos "create-" (o sequelize-cli
// aplica as migrations em ordem alfabética).
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Preço pago em cada item, para conferir o valor quando o pagamento chega
    await queryInterface.addColumn("Purchases", "price", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    // Pagamento estornado, cancelado ou contestado (chargeback)
    await queryInterface.addColumn("Purchases", "refunded", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Purchases", "refunded");
    await queryInterface.removeColumn("Purchases", "price");
  },
};
