// Regiões do mapa do mundo (a pintura do spawn, em /public/mapa-do-mundo.png).
export const REGIONS = [
  {
    name: "Cratera do Início",
    color: "#9a9aa2",
    description: "Onde toda jornada começa: o ponto de chegada de quem entra no servidor.",
  },
  {
    name: "Cidadela de Hail",
    color: "#c9b48f",
    description: "A cidade murada no coração do mapa, cercada por um fosso.",
  },
  {
    name: "Vale Florido",
    color: "#f2a7c3",
    description: "Cerejeiras em volta de um grande lago, com uma vila na ilha central.",
  },
  {
    name: "Planícies Verdes",
    color: "#7bc96f",
    description: "Campos abertos e bosques densos a leste da cidadela.",
  },
  {
    name: "Floresta Sombria",
    color: "#3f7a3a",
    description: "Uma mata fechada no centro do continente.",
  },
  {
    name: "Picos Gélidos",
    color: "#dfe8f0",
    description: "Montanhas nevadas, pinheiros e um lago de águas geladas.",
  },
  {
    name: "Terras Ardentes",
    color: "#d6a15a",
    description: "Deserto com ruínas antigas, um vulcão ativo e um rio de lava.",
  },
  {
    name: "Área Inexplorada",
    color: "#34435c",
    description: "Terras ainda cobertas pela névoa. Novos biomas em breve.",
  },
];

// Cidades com warp (/warp), na ordem do menu "Viagem rápida", que segue a
// progressão de níveis. Cidades e estradas não têm monstros.
export const TOWNS = [
  "Cratera da Ruína (spawn)",
  "Cidade dos Cubos",
  "Cidadela de Hail",
  "Prado Verdejante",
  "Refúgio das Pétalas",
  "Bosque do Crepúsculo",
  "Fronteira Nevada",
  "Inferno Escaldante",
];

// Faixas de nível dos monstros (regiões do WorldGuard no servidor). O nível
// sobe conforme você se afasta da cratera do spawn.
export const LEVEL_ZONES = [
  { name: "Cratera (spawn)", levels: "1 a 25" },
  { name: "Sul", levels: "26 a 60" },
  { name: "Leste", levels: "61 a 80" },
  { name: "Lago das Cerejeiras", levels: "81 a 110" },
  { name: "Floresta Central", levels: "111 a 140" },
  { name: "Neve", levels: "141 a 200" },
  { name: "Vulcão", levels: "201 a 250" },
];

export type Boss = {
  name: string;
  role: "Chefe" | "Mini-chefe";
  levels: string;
  where: string;
  description: string;
  // minutos para voltar depois de morto
  respawn: number;
};

// Chefes e mini-chefes posicionados no mapa (context/mobs.md no servidor)
export const BOSSES: Boss[] = [
  {
    name: "Cuboss Slime",
    role: "Chefe",
    levels: "16",
    where: "Perto da cratera do spawn",
    description:
      "Um slime gigante, com uns 13 blocos de altura, que dorme espalhado no chão como uma poça até alguém chegar perto. Pisa o chão, esmaga com a mão e faz chover slime nos lugares marcados, soltando mini slimes pelo caminho.",
    respawn: 30,
  },
  {
    name: "Rainha Bandida Jiaxin",
    role: "Chefe",
    levels: "25",
    where: "Fortaleza dos Bandidos",
    description:
      "A líder dos bandidos espera no alto da fortaleza, cercada por cinco guardas que só atacam quando você se aproxima.",
    respawn: 30,
  },
  {
    name: "Titã da Pedra Rúnica",
    role: "Chefe",
    levels: "25",
    where: "Masmorra nos arredores da cratera",
    description:
      "Um golem colossal que fica imóvel até alguém entrar no alcance. Golpeia a área toda, esmaga os lugares marcados e chama até quatro mini golems.",
    respawn: 30,
  },
  {
    name: "Capitão Barba-Morta",
    role: "Chefe",
    levels: "60",
    where: "Ilha Pirata",
    description:
      "Luta com gancho e canhão e faz chover balas nos lugares marcados. Com 75%, 50% e 25% da vida fica atordoado e chama cinco tripulantes; abaixo da metade, troca a mão pelo gancho.",
    respawn: 30,
  },
  {
    name: "O Arquivista",
    role: "Chefe",
    levels: "60",
    where: "Castelo da cidade murada",
    description:
      "Um mago de livros que lança magia em linha, gira velas à sua volta e faz chover livros nos lugares marcados. De tempos em tempos invoca Guerreiros de Vela.",
    respawn: 30,
  },
  {
    name: "Senhor da Guerra Kragan",
    role: "Chefe",
    levels: "70",
    where: "Trono da fortaleza de Kragan",
    description:
      "Dorme sentado no trono até alguém chegar a 28 blocos. Então salta sobre o jogador mais próximo e arremessa quem estiver em volta. Ataca com cortes furiosos, redemoinho e a Lâmina Infernal, que cai nos lugares marcados, e se enfurece depois de 40 golpes. Se ficar 8 segundos sem lutar, volta para o trono.",
    respawn: 30,
  },
  {
    name: "Rei Goblin",
    role: "Mini-chefe",
    levels: "16, 25, 33, 42 e 70",
    where: "Um em cada acampamento goblin",
    description:
      "Acerta a área toda e golpeia os lugares marcados, enquanto chama ondas de goblins. Os xamãs goblins curam quem está perto.",
    respawn: 10,
  },
  {
    name: "Comandante do Martelo",
    role: "Mini-chefe",
    levels: "16",
    where: "Castelo dos cavaleiros carmesins",
    description:
      "Um cavaleiro carmesim gigante com martelo de guerra. O escudo dele quebra quando a vida chega à metade.",
    respawn: 10,
  },
  {
    name: "Campeão Bandido",
    role: "Mini-chefe",
    levels: "25",
    where: "Fortaleza dos Bandidos",
    description: "O melhor guerreiro dos bandidos guarda a parte alta da fortaleza.",
    respawn: 10,
  },
  {
    name: "Golems de Cristal",
    role: "Mini-chefe",
    levels: "Quartzo 25, Diamante 200, Redstone 230",
    where: "Pontos de missão espalhados pelo mapa",
    description:
      "Golems de cristal maiores que o normal. Pisoteiam, socam o chão, fazem brotar espinhos de cristal nos lugares marcados e arremessam cristais que viram fragmentos.",
    respawn: 10,
  },
];

// Famílias de monstros comuns e de elite, com onde aparecem
export const MOB_FAMILIES = [
  {
    name: "Golems",
    mobs: "Mini Golem e Golem de Pedregulho; elites: Golem Empilhado (se divide em mini golems ao morrer) e Golem dos Pilares (arremessa pedras)",
    where: "Cratera do spawn, níveis 1 a 25",
  },
  {
    name: "Mini Slimes",
    mobs: "Verde, Azul, Vermelho e Amarelo, cada um de um tamanho",
    where: "Cratera do spawn, níveis 1 a 25",
  },
  {
    name: "Javali",
    mobs: "Neutro: só ataca se for atacado",
    where: "Fundo da cratera, perto da vila, níveis 1 a 8",
  },
  {
    name: "Cavaleiros",
    mobs: "Lanceiro, Cavaleiro da Alabarda e Cavaleiro do Mangual; elite: Cavaleiro do Martelo",
    where: "Esquadrões azuis na cratera (1 a 25); castelos dos vermelhos (17 a 25), dos carmesins (9 a 16) e dos listrados (60 a 71)",
  },
  {
    name: "Goblins",
    mobs: "Goblin, Goblin Arqueiro e Goblin Xamã; elite: Goblin Soldado",
    where: "Acampamentos goblins de níveis 9 a 16, 17 a 25, 26 a 33, 34 a 42 e 61 a 70",
  },
  {
    name: "Bandidos",
    mobs: "Bandido Ladino (arremessa adagas) e Bandido Duelista",
    where: "Fortaleza dos Bandidos, níveis 17 a 25",
  },
  {
    name: "Ents de Carvalho",
    mobs: "Ent, Entezinho, Fera de Casca, Devastador e Arremessador; elites: Ent Colosso e Ent Ancião (disfarçado de árvore, agarra quem passa perto)",
    where: "Florestas do Sul, níveis 26 a 60",
  },
  {
    name: "Velas",
    mobs: "Cavaleiro de Vela e Mago de Vela; elite: Bruto de Vela",
    where: "Castelo da cidade murada, níveis 34 a 42",
  },
  {
    name: "Aranhas",
    mobs: "Aranha Caçadora (teia que prende), Aranha Venenosa e Aranha Estranguladora",
    where: "Pátio da cidade murada, níveis 34 a 42",
  },
  {
    name: "Piratas",
    mobs: "Tripulante Pirata (alguns carregam TNT e explodem) e Caranguejo; elite: Crustarax (bolhas que fazem levitar)",
    where: "Ilha Pirata, níveis 40 a 60",
  },
  {
    name: "Sentinela Dourado",
    mobs: "Elite: estátua que acorda quando alguém chega a 8 blocos",
    where: "Pátios da fortaleza de Kragan, níveis 52 a 60",
  },
];
