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
  { id: "gunslinger", name: "Pistoleiro", rarity: "base" },
  { id: "warrior", name: "Guerreiro", rarity: "base" },
  { id: "barbarian", name: "Bárbaro", rarity: "base" },
  { id: "paladin", name: "Paladino", rarity: "base" },
  { id: "flame_warrior", name: "Cavaleiro das Chamas", rarity: "base" },
  { id: "mage", name: "Mago", rarity: "base" },
  { id: "archmage", name: "Arquimago", rarity: "base" },
  { id: "cleric", name: "Clérigo", rarity: "base" },
  { id: "pyromancer", name: "Piromante", rarity: "base" },
  { id: "rogue", name: "Ladino", rarity: "base" },
  { id: "assassin", name: "Assassino", rarity: "base" },
  { id: "ninja", name: "Ninja", rarity: "base" },
  { id: "gale_swordsman", name: "Espadachim dos Ventos", rarity: "base" },
  { id: "reaper", name: "Ceifador", rarity: "base" },
  { id: "monk", name: "Monge", rarity: "lendarias" },
  { id: "earth_mage", name: "Mago da Terra", rarity: "lendarias" },
  { id: "bard", name: "Bardo", rarity: "miticas" },
  { id: "shaman", name: "Xamã", rarity: "miticas" },
  { id: "elementalist", name: "Elementalista", rarity: "secretas" },
  { id: "summoner", name: "Invocador", rarity: "secretas" },
  { id: "shadowmancer", name: "Sombromante", rarity: "secretas" },
  { id: "death_knight", name: "Cavaleiro da Morte", rarity: "divinas" },
  { id: "martial_artist", name: "Artista Marcial", rarity: "divinas" },
  { id: "thunder_ronin", name: "Ronin do Trovão", rarity: "divinas" },
  { id: "water_samurai", name: "Samurai da Água", rarity: "divinas" },
  { id: "bloodmoon_vampire", name: "Vampiro da Lua de Sangue", rarity: "divinas" },
  { id: "dragon_warrior", name: "Dragão", rarity: "divinas" },
  { id: "necromancer", name: "Necromante", rarity: "divinas" },
];

export const CLASS_LINES: ClassLine[] = [
  {
    id: "archer",
    name: "Arqueiro",
    tiers: [
      { level: 1, classes: ["archer"] },
      { level: 50, classes: ["phoenix_hunter"] },
      { level: 100, classes: ["gunslinger"] },
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
      { level: 100, classes: ["cleric", "pyromancer"] },
    ],
  },
  {
    id: "rogue",
    name: "Ladino",
    tiers: [
      { level: 1, classes: ["rogue"] },
      { level: 50, classes: ["assassin", "ninja"] },
      { level: 100, classes: ["gale_swordsman", "reaper"] },
    ],
  },
];

export const ATTRIBUTES = [
  { id: "hp", name: "Vida", description: "Vida máxima e cura ao descansar" },
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

// Detalhes de cada classe, gerados das configurações do servidor em
// data/classDetails.ts (scripts/gerar-classes.py)

export type SkillNode = {
  name: string;
  text: string;
  // números do jogo (dano base, raio, duração...)
  details: string[];
  notes?: string[];
};

export type TreeNode = SkillNode & {
  points: number;
  // habilidade da barra a que a passiva está ligada
  parent?: string;
};

export type BarSkill = SkillNode & {
  slot: number;
  cooldown: number;
  // custo no nível 1: cresce com o nível do jogador
  cost: { resource: string; amount: number };
  points: number;
  // precisa mirar num bloco a até N blocos
  aimRange?: number;
  upgrades: TreeNode[];
};

export type ClassSkills = {
  base: SkillNode;
  corePassives: TreeNode[];
  bar: BarSkill[];
  passives: TreeNode[];
  // os dois caminhos finais: só um pode ser escolhido
  paths: TreeNode[];
  totalCost: number;
  requiresSpent: number;
};

export type ClassDetails = {
  level: number;
  description: string;
  stats: { name: string; value: number }[];
  weapon?: { name: string; damage: string; twoItems: boolean; offhand?: string };
  resource?: string;
  skills: ClassSkills | null;
};

export const MAX_CLASS_POINTS = 20;

export const getClass = (id: string) => CLASSES.find((c) => c.id === id);

export const getLine = (id: string) =>
  CLASS_LINES.find((line) =>
    line.tiers.some((tier) => tier.classes.includes(id))
  );

export const getRarity = (id: RarityId) => RARITIES.find((r) => r.id === id)!;

export const classesByRarity = (rarity: RarityId) =>
  CLASSES.filter((c) => c.rarity === rarity);

export const classIcon = (id: string) => `/classes/${id}.png`;

export const rarityIcon = (id: RarityId) => `/raridades/${id}.png`;
