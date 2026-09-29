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
    // No Postgres, inserir ids fixos não avança a sequência: sem isto a
    // próxima categoria criada tentaria usar o id 1 de novo
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"Categories"', 'id'), (SELECT MAX(id) FROM "Categories"))`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
