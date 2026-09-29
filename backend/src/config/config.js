const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// O Supabase assina o SSL com uma CA própria, que o Node não conhece.
// DB_SSL_CA aponta para o certificado baixado do painel (relativo a src/).
const readCa = () =>
  process.env.DB_SSL_CA
    ? fs.readFileSync(path.resolve(__dirname, "..", process.env.DB_SSL_CA), "utf8")
    : undefined;

// O banco é escolhido pelo .env, e vale para o site e para o sequelize-cli:
// - DATABASE_URL: PostgreSQL (Neon, Supabase, Render...), com SSL
// - DB_HOST: MySQL
// - nenhum dos dois: SQLite local (src/dev.sqlite), sem instalar nada
const pickDatabase = () => {
  if (process.env.DATABASE_URL) {
    return {
      dialect: "postgres",
      use_env_variable: "DATABASE_URL",
      logging: false,
      // Bancos online exigem SSL. DB_SSL=false só para um Postgres local.
      dialectOptions:
        process.env.DB_SSL === "false"
          ? {}
          : { ssl: { require: true, rejectUnauthorized: true, ca: readCa() } },
    };
  }

  if (process.env.DB_HOST) {
    return {
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
    };
  }

  return {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "dev.sqlite"),
    logging: false,
  };
};

const database = pickDatabase();

module.exports = {
  development: database,
  test: database,
  production: database,
};
