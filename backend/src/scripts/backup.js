"use strict";
// Cópia de segurança do banco: salva todas as linhas das tabelas num JSON em
// backend/backups/ (fora do git: tem os nicks e os pagamentos das doações).
// O plano grátis do Supabase não deixa baixar backups, por isso este script.
// Usa o banco do src/.env (o mesmo do site), então não precisa do pg_dump.
//
//   npm run db:backup
//
// Para voltar uma cópia num banco vazio, veja restore.js.
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");

// Na ordem das chaves estrangeiras: quem é referenciado vem antes
const TABLES = ["Categories", "Products", "Purchases", "SequelizeMeta"];
const DIR = path.join(__dirname, "..", "..", "backups");

(async () => {
  const backup = {
    createdAt: new Date().toISOString(),
    dialect: sequelize.getDialect(),
    tables: {},
  };
  const qi = sequelize.getQueryInterface();
  for (const table of TABLES) {
    const order = table === "SequelizeMeta" ? "name" : "id";
    backup.tables[table] = await sequelize.query(
      `SELECT * FROM ${qi.quoteIdentifier(table)} ORDER BY ${qi.quoteIdentifier(order)}`,
      { type: sequelize.QueryTypes.SELECT }
    );
  }
  await sequelize.close();

  fs.mkdirSync(DIR, { recursive: true });
  const stamp = backup.createdAt.slice(0, 19).replace(/:/g, "-");
  const file = path.join(DIR, `backup-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(backup, null, 2));

  for (const [table, rows] of Object.entries(backup.tables)) {
    console.log(`${table}: ${rows.length} linha(s)`);
  }
  console.log(`Salvo em ${file}`);
})().catch((err) => {
  console.error("Backup falhou:", err.message);
  process.exit(1);
});
