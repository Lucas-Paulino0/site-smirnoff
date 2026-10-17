"use strict";
// Volta uma cópia feita pelo backup.js para o banco do src/.env.
// Só funciona num banco novo, com as tabelas criadas e vazias:
//
//   npm run db:migrate
//   npm run db:restore -- backups/backup-2026-10-17T21-00-00.json
//
// Não rode o db:seed antes: os produtos vêm da cópia, com os mesmos ids
// que as compras usam.
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");

// Na ordem das chaves estrangeiras. A SequelizeMeta não entra: o db:migrate
// já preenche
const TABLES = ["Categories", "Products", "Purchases"];

(async () => {
  const arg = process.argv[2];
  if (!arg) throw new Error("diga qual arquivo: npm run db:restore -- <arquivo>");
  const backup = JSON.parse(fs.readFileSync(path.resolve(arg), "utf8"));
  const qi = sequelize.getQueryInterface();
  const q = (name) => qi.quoteIdentifier(name);

  for (const table of TABLES) {
    const [{ n }] = await sequelize.query(`SELECT COUNT(*) AS n FROM ${q(table)}`, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (Number(n) > 0) {
      throw new Error(`a tabela ${table} já tem ${n} linha(s); restaure só num banco vazio`);
    }
  }

  await sequelize.transaction(async (transaction) => {
    for (const table of TABLES) {
      const rows = (backup.tables[table] ?? []).map((row) => {
        // as datas voltam do JSON como texto
        const out = { ...row };
        for (const key of ["createdAt", "updatedAt", "purchaseDate", "approvedDate"]) {
          if (out[key]) out[key] = new Date(out[key]);
        }
        return out;
      });
      if (rows.length) await qi.bulkInsert(table, rows, { transaction });
      // No Postgres o contador do id não anda com ids inseridos à mão
      if (sequelize.getDialect() === "postgres") {
        await sequelize.query(
          `SELECT setval(pg_get_serial_sequence('${q(table)}', 'id'), COALESCE(MAX(id), 0) + 1, false) FROM ${q(table)}`,
          { transaction }
        );
      }
      console.log(`${table}: ${rows.length} linha(s)`);
    }
  });
  await sequelize.close();
  console.log(`Cópia de ${backup.createdAt} restaurada`);
})().catch((err) => {
  console.error("Restauração falhou:", err.message);
  process.exit(1);
});
