// Catálogo de classes do servidor. Espelha o classes.yml dos menus do jogo
// (hail-admin-kit: claude/assets/rpg-menus/gerador/classes.yml): mantenha os
// dois iguais quando uma classe mudar. Os ícones em /public/classes foram
// gerados a partir dos mesmos desenhos usados no jogo.

export type RarityId = "base" | "lendarias" | "miticas" | "secretas" | "divinas";

export type Rarity = {
  id: RarityId;
  label: string;
  how: string;
  color: string;
};

export type RpgClass = {
  id: string;
  name: string;
  rarity: RarityId;
};

export type ClassLine = {
  id: string;
  name: string;
  tiers: { level: number; classes: string[] }[];
};

export const RARITIES: Rarity[] = [
  {
    id: "base",
    label: "Base",
    how: "Todos começam no nível 1 e evoluem a cada 50 níveis",
    color: "#d8d8d8",
  },
  {
    id: "lendarias",
    label: "Lendárias",
    how: "Drop de chefes",
    color: "#ffb030",
  },
  {
    id: "miticas",
    label: "Míticas",
    how: "Drop de chefes",
    color: "#d0306a",
  },
  {
    id: "secretas",
    label: "Secretas",
    how: "Conquistadas em missões",
    color: "#40d0c0",
  },
  {
    id: "divinas",
    label: "Divinas",
    how: "Disponíveis na loja",
    color: "#fff0a0",
  },
];

export const CLASSES: RpgClass[] = [
  { id: "archer", name: "Arqueiro", rarity: "base" },
  { id: "phoenix_hunter", name: "Fênix", rarity: "base" },
  { id: "arsenalist", name: "Mestre das Armas", rarity: "base" },
  { id: "warrior", name: "Guerreiro", rarity: "base" },
  { id: "barbarian", name: "Bárbaro", rarity: "base" },
  { id: "paladin", name: "Paladino", rarity: "base" },
  { id: "flame_warrior", name: "Cavaleiro das Chamas", rarity: "base" },
  { id: "mage", name: "Mago", rarity: "base" },
  { id: "archmage", name: "Arquimago", rarity: "base" },
  { id: "cleric", name: "Clérigo", rarity: "base" },
  { id: "pyromancer", name: "Piromante", rarity: "base" },
  { id: "cryomancer", name: "Criomante", rarity: "base" },
  { id: "assassin", name: "Assassino", rarity: "base" },
  { id: "rogue", name: "Ladino", rarity: "base" },
  { id: "ninja", name: "Ninja", rarity: "base" },
  { id: "gale_swordsman", name: "Espadachim dos Ventos", rarity: "base" },
  { id: "reaper", name: "Ceifador", rarity: "base" },
  { id: "monk", name: "Monk", rarity: "lendarias" },
  { id: "earth_mage", name: "Earth Mage", rarity: "lendarias" },
  { id: "death_knight", name: "Death Knight", rarity: "miticas" },
  { id: "shaman", name: "Shaman", rarity: "miticas" },
  { id: "summoner", name: "Summoner", rarity: "secretas" },
  { id: "bard", name: "Bardo", rarity: "secretas" },
  { id: "shadowmancer", name: "Shadowmancer", rarity: "secretas" },
  { id: "martial_artist", name: "Martial Artist", rarity: "divinas" },
  { id: "thunder_ronin", name: "Thunder Ronin", rarity: "divinas" },
  { id: "water_samurai", name: "Water Samurai", rarity: "divinas" },
  { id: "bloodmoon_vampire", name: "Bloodmoon Vampire", rarity: "divinas" },
  { id: "dragon_warrior", name: "Dragon Warrior", rarity: "divinas" },
  { id: "necromancer", name: "Necromancer", rarity: "divinas" },
];

export const CLASS_LINES: ClassLine[] = [
  {
    id: "archer",
    name: "Arqueiro",
    tiers: [
      { level: 1, classes: ["archer"] },
      { level: 50, classes: ["phoenix_hunter"] },
      { level: 100, classes: ["arsenalist"] },
    ],
  },
  {
    id: "warrior",
    name: "Guerreiro",
    tiers: [
      { level: 1, classes: ["warrior"] },
      { level: 50, classes: ["barbarian"] },
      { level: 100, classes: ["paladin", "flame_warrior"] },
    ],
  },
  {
    id: "mage",
    name: "Mago",
    tiers: [
      { level: 1, classes: ["mage"] },
      { level: 50, classes: ["archmage"] },
      { level: 100, classes: ["cleric", "pyromancer", "cryomancer"] },
    ],
  },
  {
    id: "assassin",
    name: "Assassino",
    tiers: [
      { level: 1, classes: ["assassin"] },
      { level: 50, classes: ["rogue", "ninja"] },
      { level: 100, classes: ["gale_swordsman", "reaper"] },
    ],
  },
];

export const ATTRIBUTES = [
  { id: "hp", name: "Vida", description: "Vida máxima e regeneração" },
  { id: "str", name: "Força", description: "Dano físico" },
  {
    id: "dex",
    name: "Destreza",
    description: "Dano físico, dano de projéteis e velocidade de ataque",
  },
  { id: "int", name: "Inteligência", description: "Dano mágico" },
  {
    id: "def",
    name: "Defesa",
    description: "Pontos de defesa e resistência a repulsão",
  },
  { id: "sta", name: "Estamina", description: "Estamina máxima e regeneração" },
  { id: "mp", name: "Mana", description: "Mana máxima e regeneração" },
  {
    id: "agi",
    name: "Agilidade",
    description: "Velocidade de movimento e chance de crítico",
  },
];

export const getClass = (id: string) => CLASSES.find((c) => c.id === id);

export const getRarity = (id: RarityId) => RARITIES.find((r) => r.id === id)!;

export const classesByRarity = (rarity: RarityId) =>
  CLASSES.filter((c) => c.rarity === rarity);

export const classIcon = (id: string) => `/classes/${id}.png`;

export const rarityIcon = (id: RarityId) => `/raridades/${id}.png`;
