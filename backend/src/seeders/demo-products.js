"use strict";

// Catálogo inicial da loja, com os preços de 2026-09-29. Só os VIPs entram
// ativos: Classes, Tickets e Tostões dependem do RPGCore, que ainda não está no
// servidor principal (enabled false aparece no site como "Em breve").
// Para lançar um produto, mude enabled para true.
//
// internalName é o que o plugin de entrega recebe em POST /purchases/approved
// para saber o que entregar. items usa "|" para separar as linhas da lista.

const DIVINE_CLASSES = [
  { id: "martial_artist", name: "Martial Artist" },
  { id: "thunder_ronin", name: "Thunder Ronin" },
  { id: "water_samurai", name: "Water Samurai" },
  { id: "bloodmoon_vampire", name: "Bloodmoon Vampire" },
  { id: "dragon_warrior", name: "Dragon Warrior" },
  // Na config do RPGCore o Necromancer exige nível 100 (as outras, nível 1)
  { id: "necromancer", name: "Necromancer", level: 100, price: 29.9 },
];

// Ativo = o plugin de entrega já sabe entregar no servidor principal
const soon = (price) => ({ price, enabled: false });
const live = (price) => ({ price, enabled: true });

const products = [
  ...DIVINE_CLASSES.map((c) => ({
    internalName: `classe_${c.id}`,
    name: c.name,
    description: `Desbloqueia a Classe Divina ${c.name} na sua conta, para sempre.${
      c.level ? ` Requer nível ${c.level} para usar.` : ""
    }`,
    image: `produtos/classe_${c.id}.png`,
    items: `Classe Divina ${c.name}|Desbloqueio permanente${
      c.level ? `|Requer nível ${c.level}` : ""
    }`,
    category: 1,
    ...soon(c.price || 24.9),
  })),
  // VIPs = grupos do LuckPerms (heroi < monarca < divindade); cada um herda
  // as vantagens do anterior
  {
    internalName: "heroi_30d",
    name: "Herói (30 dias)",
    description: "O primeiro VIP: tag de Herói e chat sem espera.",
    image: "produtos/heroi.png",
    items: "Tag [Herói] no chat, no TAB e acima do nome|Chat sem intervalo entre mensagens (jogadores: 5s)|Duração: 30 dias",
    category: 2,
    ...live(9.9),
  },
  {
    internalName: "monarca_30d",
    name: "Monarca (30 dias)",
    description: "Tudo do Herói, mais baú do fim, bigorna e /back de qualquer lugar.",
    image: "produtos/monarca.png",
    items: "Tudo do Herói, com a tag [Monarca]|/enderchest: seu baú do fim de qualquer lugar|/anvil: bigorna de qualquer lugar|/back: volta ao último lugar, inclusive onde você morreu|Duração: 30 dias",
    category: 2,
    ...live(19.9),
  },
  {
    internalName: "divindade_30d",
    name: "Divindade (30 dias)",
    description: "O VIP máximo: tudo do Monarca, mais /repair.",
    image: "produtos/divindade.png",
    items: "Tudo do Monarca, com a tag [Divindade]|/repair: conserta o item na mão|Duração: 30 dias",
    category: 2,
    ...live(34.9),
  },
  {
    internalName: "ticket_1",
    name: "1 Ticket de troca",
    description:
      "Um ticket de troca de classe, usado para evoluir para a próxima classe da sua linha.",
    image: "produtos/ticket.png",
    items: "1 Ticket de troca de classe",
    category: 3,
    ...soon(4.9),
  },
  {
    internalName: "ticket_3",
    name: "3 Tickets de troca",
    description: "Pacote com três tickets de troca de classe.",
    image: "produtos/ticket.png",
    items: "3 Tickets de troca de classe",
    category: 3,
    ...soon(12.9),
  },
  {
    internalName: "tostoes_1000",
    name: "1.000 Tostões",
    description: "Uma bolsa de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_1.png",
    items: "1.000 Tostões",
    category: 4,
    ...soon(4.9),
  },
  {
    internalName: "tostoes_5000",
    name: "5.000 Tostões",
    description: "Uma pilha de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_2.png",
    items: "5.000 Tostões",
    category: 4,
    ...soon(19.9),
  },
  {
    internalName: "tostoes_20000",
    name: "20.000 Tostões",
    description: "Um baú cheio de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_3.png",
    items: "20.000 Tostões",
    category: 4,
    ...soon(69.9),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
