"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        { id: 1, internalName: "classes_divinas", name: "Classes Divinas" },
        { id: 2, internalName: "vip", name: "VIPs" },
        { id: 3, internalName: "tickets", name: "Tickets de troca" },
        { id: 4, internalName: "tostoes", name: "Tostões" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
