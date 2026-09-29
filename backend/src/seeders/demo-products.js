"use strict";

// Catálogo inicial da loja. Os preços ainda não foram definidos pela equipe:
// todo produto entra com price 0 e enabled false (aparece como "Em breve").
// Para lançar um produto, defina o preço e mude enabled para true.
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
  { id: "necromancer", name: "Necromancer", level: 100 },
];

const placeholder = { price: 0, enabled: false };

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
    ...placeholder,
  })),
  {
    internalName: "vip_30d",
    name: "VIP (30 dias)",
    description: "Vantagens de conforto por 30 dias.",
    image: "produtos/vip.png",
    items: "2 homes em vez de 1|Intervalo de chat de 2s em vez de 3s|Duração: 30 dias",
    category: 2,
    ...placeholder,
  },
  {
    internalName: "premium_30d",
    name: "Premium (30 dias)",
    description: "O pacote completo de conforto por 30 dias.",
    image: "produtos/premium.png",
    items: "3 homes em vez de 1|Intervalo de chat de 1s em vez de 3s|Duração: 30 dias",
    category: 2,
    ...placeholder,
  },
  {
    internalName: "ticket_1",
    name: "1 Ticket de troca",
    description:
      "Um ticket de troca de classe, usado para evoluir para a próxima classe da sua linha.",
    image: "produtos/ticket.png",
    items: "1 Ticket de troca de classe",
    category: 3,
    ...placeholder,
  },
  {
    internalName: "ticket_3",
    name: "3 Tickets de troca",
    description: "Pacote com três tickets de troca de classe.",
    image: "produtos/ticket.png",
    items: "3 Tickets de troca de classe",
    category: 3,
    ...placeholder,
  },
  {
    internalName: "tostoes_1000",
    name: "1.000 Tostões",
    description: "Uma bolsa de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_1.png",
    items: "1.000 Tostões",
    category: 4,
    ...placeholder,
  },
  {
    internalName: "tostoes_5000",
    name: "5.000 Tostões",
    description: "Uma pilha de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_2.png",
    items: "5.000 Tostões",
    category: 4,
    ...placeholder,
  },
  {
    internalName: "tostoes_20000",
    name: "20.000 Tostões",
    description: "Um baú cheio de Tostões, a moeda do servidor.",
    image: "produtos/tostoes_3.png",
    items: "20.000 Tostões",
    category: 4,
    ...placeholder,
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
