"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          internalName: "vip_1",
          name: "Vip Teste",
          description: "O jogador receberá o vip teste por 30 dias que lhe dará acesso a diversos benefícios.",
          image: "vip1.png",
          items: "Vip Teste por 30 dias",
          price: 10,
          enabled: true,
          category: 1,
          server: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
