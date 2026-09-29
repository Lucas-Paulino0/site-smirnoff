"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Servers",
      [
        {
          name: "Servidor 1",
          ip: "",
          image: "https://via.placeholder.com/150",
          video: "https://www.youtube.com/embed/1",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Servers", null, {});
  },
};
