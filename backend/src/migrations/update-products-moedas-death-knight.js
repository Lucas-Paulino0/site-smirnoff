"use strict";
// Catálogo de 2026-10-17, alinhado com o servidor:
// - Classes Divinas com os nomes em português do RPGCore
// - nova Classe Divina Cavaleiro da Morte (desativada, como as outras)
// - a moeda do servidor agora é Moeda/Moedas, não mais Tostões
//
// Os internalName não mudam (tostoes_1000 etc.): são a chave que o plugin de
// entrega usa. Numa instalação nova a tabela ainda está vazia quando as
// migrations rodam, e o seeder já traz tudo isso; aí esta migration não faz nada.

const CLASSES = [
  { id: "martial_artist", name: "Artista Marcial", old: "Martial Artist" },
  { id: "thunder_ronin", name: "Ronin do Trovão", old: "Thunder Ronin" },
  { id: "water_samurai", name: "Samurai da Água", old: "Water Samurai" },
  { id: "bloodmoon_vampire", name: "Vampiro da Lua de Sangue", old: "Bloodmoon Vampire" },
  { id: "dragon_warrior", name: "Dragão", old: "Dragon Warrior" },
  { id: "necromancer", name: "Necromante", old: "Necromancer", level: 100 },
];

const DEATH_KNIGHT = {
  internalName: "classe_death_knight",
  name: "Cavaleiro da Morte",
  description: "Desbloqueia a Classe Divina Cavaleiro da Morte na sua conta, para sempre.",
  image: "produtos/classe_death_knight.png",
  items: "Classe Divina Cavaleiro da Morte|Desbloqueio permanente",
  price: 24.9,
  enabled: false,
  category: 1,
};

const COINS = [
  { amount: 1000, label: "1.000", what: "Uma bolsa" },
  { amount: 5000, label: "5.000", what: "Uma pilha" },
  { amount: 20000, label: "20.000", what: "Um baú cheio" },
];

const classFields = (name, level) => ({
  name,
  description: `Desbloqueia a Classe Divina ${name} na sua conta, para sempre.${
    level ? ` Requer nível ${level} para usar.` : ""
  }`,
  items: `Classe Divina ${name}|Desbloqueio permanente${level ? `|Requer nível ${level}` : ""}`,
});

const coinFields = (c, coins) => ({
  name: `${c.label} ${coins}`,
  description: `${c.what} de ${coins}, a moeda do servidor.`,
  items: `${c.label} ${coins}`,
});

async function catalogExists(queryInterface) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT id FROM "Products" WHERE "internalName" = 'classe_necromancer'`
  );
  return rows.length > 0;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    if (!(await catalogExists(queryInterface))) return;

    for (const c of CLASSES) {
      await queryInterface.bulkUpdate("Products", classFields(c.name, c.level), {
        internalName: `classe_${c.id}`,
      });
    }
    const [dk] = await queryInterface.sequelize.query(
      `SELECT id FROM "Products" WHERE "internalName" = 'classe_death_knight'`
    );
    if (dk.length === 0) await queryInterface.bulkInsert("Products", [DEATH_KNIGHT]);

    for (const c of COINS) {
      await queryInterface.bulkUpdate("Products", coinFields(c, "Moedas"), {
        internalName: `tostoes_${c.amount}`,
      });
    }
    await queryInterface.bulkUpdate("Categories", { name: "Moedas" }, { internalName: "tostoes" });
  },

  async down(queryInterface) {
    if (!(await catalogExists(queryInterface))) return;

    for (const c of CLASSES) {
      await queryInterface.bulkUpdate("Products", classFields(c.old, c.level), {
        internalName: `classe_${c.id}`,
      });
    }
    // Só apaga o Cavaleiro da Morte se ninguém comprou (a compra aponta para o produto)
    await queryInterface.sequelize.query(
      `DELETE FROM "Products" WHERE "internalName" = 'classe_death_knight'
         AND NOT EXISTS (SELECT 1 FROM "Purchases" WHERE "Purchases"."productId" = "Products".id)`
    );
    for (const c of COINS) {
      await queryInterface.bulkUpdate("Products", coinFields(c, "Tostões"), {
        internalName: `tostoes_${c.amount}`,
      });
    }
    await queryInterface.bulkUpdate("Categories", { name: "Tostões" }, { internalName: "tostoes" });
  },
};
