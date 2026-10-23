// Pontos do mapa interativo (/mapa), em coordenadas do mundo (x, z).
// Fontes no servidor (2026-10-17; chefes e masmorras novos em 2026-10-22): warps do EternalCore, spawners do MythicMobs e
// regiões do WorldGuard (context/regions.md e context/mobs.md). As zonas de
// nível (public/mapa-do-mundo/zonas.json) e o terreno (public/mapa-do-mundo/tiles)
// são gerados dos arquivos do mundo por frontend/scripts/mapa/.

// Área coberta pelos tiles: canto noroeste e tamanho, em blocos (1 pixel por
// bloco no zoom máximo nativo).
export const MAP_ORIGIN = { x: -4224, z: -2624 };
export const MAP_SIZE = { width: 6912, height: 5376 };
export const MAP_NATIVE_ZOOM = 5;
export const SPAWN = { x: -1917, z: 1572 };

// Link que abre o mapa num ponto, com um marcador (zoom 5 = 1 pixel por bloco)
export function mapLink(x: number, z: number, zoom = MAP_NATIVE_ZOOM) {
  return `/mapa?x=${x}&z=${z}&zoom=${zoom}`;
}

export type MapTown = { name: string; warp: string; x: number; z: number };

// Na ordem do menu "Viagem rápida" (/warp); x e z = centro da cidade
export const MAP_TOWNS: MapTown[] = [
  { name: "Cratera da Ruína", warp: "cratera_da_ruina_spawn", x: -1892, z: 1587 },
  { name: "Cidade dos Cubos", warp: "cidade_dos_cubo", x: -708, z: 2316 },
  { name: "Cidadela de Hail", warp: "cidadela_de_hail", x: -116, z: 1485 },
  { name: "Prado Verdejante", warp: "prado_verdejante", x: 1619, z: 2334 },
  { name: "Selva de Jade", warp: "selva_de_jade", x: 1212, z: 808 },
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
  { name: "Rei Golem Corrompido", role: "Chefe", level: 70, x: 1178, z: 1259 },
  { name: "Minotauro", role: "Chefe", level: 70, x: 770, z: 313 },
  { name: "Kazk, a Rainha", role: "Chefe", level: 80, x: 1874, z: 600 },
  { name: "Os Amantes", role: "Chefe", level: 110, x: -1312, z: 328 },
  { name: "Falso Deus: Lanterna Penitente", role: "Chefe", level: 110, x: -763, z: 582 },
  { name: "Bodhisattva Guanyin", role: "Chefe", level: 110, x: -1841, z: 210 },
  { name: "Pontífice Demoníaco", role: "Chefe", level: 140, x: -200, z: -925 },
  { name: "Kriger", role: "Chefe", level: 180, x: 831, z: -89 },
  { name: "Campeão Bandido", role: "Mini-chefe", level: 25, x: -1506, z: 2018 },
  { name: "Comandante do Martelo", role: "Mini-chefe", level: 16, x: -2304, z: 1063 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 16, x: -1835, z: 884 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 25, x: -1999, z: 67 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 33, x: -503, z: 872 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 42, x: 753, z: 1520 },
  { name: "Rei Goblin", role: "Mini-chefe", level: 70, x: 617, z: 28 },
  { name: "Golem de Quartzo", role: "Mini-chefe", level: 25, x: -2034, z: 2255 },
  { name: "Mestre Oni Samurai", role: "Mini-chefe", level: 100, x: -1486, z: 375 },
  { name: "Flor Mutante", role: "Mini-chefe", level: 150, x: 772, z: 178 },
  { name: "Tezcacoatl, o Ancestral", role: "Mini-chefe", level: 180, x: 873, z: 64 },
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
  { name: "Arena do Minotauro", levels: "70", mobs: "Minotauro", x: 789, z: 312 },
  { name: "Ilha dos Murlocs", levels: "61 a 70", mobs: "Murlocs e o Rei Golem Corrompido", x: 1155, z: 1283 },
  { name: "Muralha das Plantas", levels: "71 a 80", mobs: "Plantas despertas e Kazk, a Rainha", x: 1875, z: 613 },
  { name: "Acampamento Bokoblin", levels: "71 a 80", mobs: "Bokoblins e Moblins", x: 1956, z: 1001 },
  { name: "Ninho dos Pássaros", levels: "81 a 90", mobs: "Pardais e melros berserker", x: -769, z: 1046 },
  { name: "Castelo dos Yokais", levels: "90 a 110", mobs: "Yokais e Os Amantes", x: -1407, z: 140 },
  { name: "Vila dos Yokais", levels: "91 a 110", mobs: "Kappa, Tengu, Yurei e Oni", x: -1964, z: 472 },
  { name: "Fortaleza Oni", levels: "91 a 100", mobs: "Onis e o Mestre Oni Samurai", x: -1490, z: 379 },
  { name: "Templo dos Onis", levels: "101 a 110", mobs: "Onis e o Falso Deus", x: -786, z: 599 },
  { name: "Templo de Guanyin", levels: "110", mobs: "Bodhisattva Guanyin", x: -1841, z: 210 },
  { name: "Masmorra do Pontífice Demoníaco", levels: "140", mobs: "Pontífice Demoníaco e os Olhos Demoníacos", x: -200, z: -925 },
  { name: "Caverna dos Lagartos", levels: "165 a 180", mobs: "Lagartos, Tezcacoatl e Kriger; a Flor Mutante guarda a entrada", x: 737, z: 34 },
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
    x: -2330,
    z: 2420,
  },
  {
    name: "Prado Verdejante",
    minLevel: 26,
    maxLevel: 60,
    description:
      "Florestas de ents ao sul e a leste da Cidadela de Hail, a Cidade Murada, a Ilha Pirata e a fortaleza de Kragan.",
    x: 1000,
    z: 1650,
  },
  {
    name: "Selva de Jade",
    minLevel: 61,
    maxLevel: 80,
    description: "A selva densa a leste, entre a Cidadela e as montanhas nevadas.",
    x: 1550,
    z: 1000,
  },
  {
    name: "Refúgio das Pétalas",
    minLevel: 81,
    maxLevel: 110,
    description:
      "Cerejeiras em volta do grande lago, com a cidade na ilha.",
    x: -1365,
    z: -60,
  },
  {
    name: "Bosque do Crepúsculo",
    minLevel: 111,
    maxLevel: 140,
    description:
      "A mata fechada no centro do continente.",
    x: -390,
    z: -720,
  },
  {
    name: "Fronteira Nevada",
    minLevel: 141,
    maxLevel: 200,
    description:
      "Montanhas nevadas, pinheiros e um lago gelado no nordeste.",
    x: 1300,
    z: -1550,
  },
  {
    name: "Inferno Escaldante",
    minLevel: 201,
    maxLevel: 250,
    description:
      "O deserto vulcânico do noroeste, com rios de lava e ruínas.",
    x: -2453,
    z: -1330,
  },
];

// Aviso no canto sudoeste, onde o mundo ainda não tem terreno (a névoa do mapa)
export const MAP_UNEXPLORED = {
  title: "Área inexplorada",
  text: "Novos biomas em breve",
  x: -3440,
  z: 1320,
};
