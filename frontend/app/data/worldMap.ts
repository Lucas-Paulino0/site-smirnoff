// Pontos do mapa interativo (/mapa), em coordenadas do mundo (x, z).
// Fontes no servidor (2026-10-17): warps do EternalCore, spawners do MythicMobs e
// regiões do WorldGuard (context/regions.md e context/mobs.md). As zonas de
// nível (public/mapa-do-mundo/zonas.json) e o terreno (public/mapa-do-mundo/tiles)
// são gerados dos arquivos do mundo por frontend/scripts/mapa/.

// Área coberta pelos tiles: canto noroeste e tamanho, em blocos (1 pixel por
// bloco no zoom máximo nativo).
export const MAP_ORIGIN = { x: -4224, z: -2624 };
export const MAP_SIZE = { width: 6912, height: 5376 };
export const MAP_NATIVE_ZOOM = 5;
export const SPAWN = { x: -1917, z: 1572 };

export type MapTown = { name: string; warp: string; x: number; z: number };

// Na ordem do menu "Viagem rápida" (/warp); x e z = centro da cidade
export const MAP_TOWNS: MapTown[] = [
  { name: "Cratera da Ruína", warp: "cratera_da_ruina_spawn", x: -1892, z: 1587 },
  { name: "Cidade dos Cubos", warp: "cidade_dos_cubo", x: -708, z: 2316 },
  { name: "Cidadela de Hail", warp: "cidadela_de_hail", x: -116, z: 1485 },
  { name: "Prado Verdejante", warp: "prado_verdejante", x: 1619, z: 2334 },
  { name: "Refúgio das Pétalas", warp: "refugio_das_petalas", x: -1328, z: 865 },
  { name: "Bosque do Crepúsculo", warp: "bosque_do_crepusculo", x: -407, z: -307 },
  { name: "Fronteira Nevada", warp: "fronteira_nevada", x: 1072, z: -1053 },
  { name: "Inferno Escaldante", warp: "inferno_escaldante", x: -2720, z: -753 },
];

export type MapBoss = {
  name: string;
  role: "Chefe" | "Mini-chefe";
  level: number;
  x: number;
  z: number;
};

// Posição exata do spawner de cada chefe
export const MAP_BOSSES: MapBoss[] = [
  { name: "Cuboss Slime", role: "Chefe", level: 16, x: -1230, z: 1726 },
  { name: "Rainha Bandida Jiaxin", role: "Chefe", level: 25, x: -1506, z: 1959 },
  { name: "Titã da Pedra Rúnica", role: "Chefe", level: 25, x: -1308, z: 2348 },
  { name: "Capitão Barba-Morta", role: "Chefe", level: 60, x: 598, z: 2119 },
  { name: "O Arquivista", role: "Chefe", level: 60, x: 55, z: 2451 },
  { name: "Senhor da Guerra Kragan", role: "Chefe", level: 70, x: 2309, z: 1923 },
  { name: "Campeão Bandido", role: "Mini-chefe", level: 25, x: -1506, z: 2018 },
  { name: "Comandante do Martelo", role: "Mini-chefe", level: 16, x: -2304, z: 1063 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 16, x: -1835, z: 884 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 25, x: -1999, z: 67 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 33, x: -503, z: 872 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 42, x: 753, z: 1520 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 70, x: 617, z: 28 },
  { name: "Golem de Quartzo", role: "Mini-chefe", level: 25, x: -2034, z: 2255 },
  { name: "Golem de Diamante", role: "Mini-chefe", level: 200, x: 2414, z: -1149 },
  { name: "Golem de Redstone", role: "Mini-chefe", level: 230, x: -3901, z: -1098 },
];

export type MapPlace = {
  name: string;
  levels: string;
  mobs: string;
  x: number;
  z: number;
};

// Construções que já têm monstros (centro da região de cada uma)
export const MAP_PLACES: MapPlace[] = [
  { name: "Acampamento Goblin", levels: "9 a 16", mobs: "Goblins e o Rei Goblin", x: -1844, z: 882 },
  { name: "Castelo dos Cavaleiros Carmesins", levels: "9 a 16", mobs: "Cavaleiros carmesins e o Comandante do Martelo", x: -2303, z: 1069 },
  { name: "Torre dos Cavaleiros Carmesins", levels: "9 a 16", mobs: "Cavaleiros carmesins", x: -1247, z: 1464 },
  { name: "Acampamento Goblin", levels: "17 a 25", mobs: "Goblins e o Rei Goblin", x: -1991, z: 81 },
  { name: "Castelo dos Cavaleiros Vermelhos", levels: "17 a 25", mobs: "Cavaleiros vermelhos no pátio e na torre", x: -1166, z: 2051 },
  { name: "Fortaleza dos Bandidos", levels: "17 a 25", mobs: "Bandidos, o Campeão Bandido e a Rainha Bandida Jiaxin", x: -1507, z: 1990 },
  { name: "Masmorra do Titã", levels: "25", mobs: "Titã da Pedra Rúnica", x: -1308, z: 2348 },
  { name: "Acampamento Goblin", levels: "26 a 33", mobs: "Goblins e o Rei Goblin", x: -509, z: 881 },
  { name: "Acampamento Goblin", levels: "34 a 42", mobs: "Goblins e o Rei Goblin", x: 740, z: 1524 },
  { name: "Cidade Murada", levels: "34 a 42", mobs: "Aranhas no pátio, monstros de vela no castelo e O Arquivista", x: 55, z: 2448 },
  { name: "Ilha Pirata", levels: "40 a 60", mobs: "Piratas, caranguejos, Crustarax e o Capitão Barba-Morta", x: 683, z: 2128 },
  { name: "Fortaleza de Kragan", levels: "52 a 60", mobs: "Sentinelas Dourados e o Senhor da Guerra Kragan", x: 2286, z: 1924 },
  { name: "Castelo dos Cavaleiros Listrados", levels: "60 a 71", mobs: "Cavaleiros listrados dentro da muralha", x: 555, z: -176 },
  { name: "Acampamento Goblin", levels: "61 a 70", mobs: "Goblins e o Rei Goblin", x: 622, z: 36 },
];

// Cor das zonas pelo nível: verde no começo, roxo no fim
const LEVEL_COLORS: [number, string][] = [
  [1, "#6fcf5a"],
  [26, "#c8d84a"],
  [61, "#f0c040"],
  [81, "#f39a3a"],
  [111, "#e8613a"],
  [141, "#d13c55"],
  [201, "#9a46c4"],
];

export function levelColor(level: number) {
  let color = LEVEL_COLORS[0][1];
  for (const [from, c] of LEVEL_COLORS) if (level >= from) color = c;
  return color;
}

export type MapArea = {
  name: string;
  minLevel: number;
  maxLevel: number;
  description: string;
  // onde o nome aparece no mapa: perto do centro das zonas da área, fora
  // de cima das cidades e dos chefes
  x: number;
  z: number;
};

// As áreas do mapa de níveis (regiões rpg_* do WorldGuard), na ordem da progressão
export const MAP_AREAS: MapArea[] = [
  {
    name: "Cratera da Ruína",
    minLevel: 1,
    maxLevel: 25,
    description:
      "A cratera de pedra do spawn, com a vila no fundo. Em volta, golems, slimes, cavaleiros e o primeiro acampamento goblin.",
    x: -2050,
    z: 2200,
  },
  {
    name: "Terras do Sul",
    minLevel: 26,
    maxLevel: 60,
    description:
      "Florestas de ents ao sul e a leste da Cidadela de Hail, a Cidade Murada, a Ilha Pirata e a fortaleza de Kragan.",
    x: 1000,
    z: 1650,
  },
  {
    name: "Planícies Verdes",
    minLevel: 61,
    maxLevel: 80,
    description: "Campos e bosques a leste, entre a Cidadela e as montanhas nevadas.",
    x: 1124,
    z: 842,
  },
  {
    name: "Vale Florido",
    minLevel: 81,
    maxLevel: 110,
    description:
      "Cerejeiras em volta do grande lago, com o Refúgio das Pétalas na ilha.",
    x: -1400,
    z: 330,
  },
  {
    name: "Floresta Sombria",
    minLevel: 111,
    maxLevel: 140,
    description:
      "A mata fechada no centro do continente, em volta do Bosque do Crepúsculo.",
    x: -390,
    z: -720,
  },
  {
    name: "Picos Gélidos",
    minLevel: 141,
    maxLevel: 200,
    description:
      "Montanhas nevadas, pinheiros e um lago gelado no nordeste, com a Fronteira Nevada.",
    x: 1300,
    z: -1550,
  },
  {
    name: "Terras Ardentes",
    minLevel: 201,
    maxLevel: 250,
    description:
      "O deserto vulcânico do noroeste, com rios de lava, ruínas e o Inferno Escaldante.",
    x: -2453,
    z: -1330,
  },
];
