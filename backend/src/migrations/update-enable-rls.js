"use strict";
// O Supabase publica as tabelas do schema public na API REST dele (PostgREST).
// Com RLS ligado e nenhuma policy, essa API não lê nem escreve nada; o backend
// continua funcionando porque conecta como dono das tabelas, que ignora o RLS.
// Só vale para PostgreSQL: no MySQL e no SQLite não faz nada.
const TABLES = ["Categories", "Products", "Purchases", "SequelizeMeta"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    if (queryInterface.sequelize.getDialect() !== "postgres") return;
    for (const table of TABLES) {
      await queryInterface.sequelize.query(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY`);
    }
  },
  async down(queryInterface) {
    if (queryInterface.sequelize.getDialect() !== "postgres") return;
    for (const table of TABLES) {
      await queryInterface.sequelize.query(`ALTER TABLE "${table}" DISABLE ROW LEVEL SECURITY`);
    }
  },
};
