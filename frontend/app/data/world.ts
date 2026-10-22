// Cidades com warp (/warp), na ordem do menu "Viagem rápida", que segue a
// progressão de níveis. Cidades e estradas não têm monstros.
export const TOWNS = [
  "Cratera da Ruína (spawn)",
  "Cidade dos Cubos",
  "Cidadela de Hail",
  "Prado Verdejante",
  "Selva de Jade",
  "Refúgio das Pétalas",
  "Bosque do Crepúsculo",
  "Fronteira Nevada",
  "Inferno Escaldante",
];

export type Boss = {
  name: string;
  role: "Chefe" | "Mini-chefe";
  levels: string;
  where: string;
  description: string;
  // minutos para voltar depois de morto
  respawn: number;
  // nomes em MAP_BOSSES (data/worldMap.ts), quando não é o próprio nome
  mapNames?: string[];
};

// Âncora da seção do chefe em /wiki/chefes
export function bossAnchor(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

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
    name: "Rei Golem Corrompido",
    role: "Chefe",
    levels: "70",
    where: "Ilha dos Murlocs, na Selva de Jade",
    description:
      "Dorme no convés da ilha até alguém chegar a 24 blocos. Cubos corrompidos curam o rei e soltam construtos que atacam os jogadores. O fogo não o machuca.",
    respawn: 30,
  },
  {
    name: "Minotauro",
    role: "Chefe",
    levels: "70",
    where: "Arena do Minotauro, na Selva de Jade",
    description:
      "Espera escondido no céu, bem acima da arena, e despenca quando alguém entra nela. Soca, chuta, investe, agarra quem chega perto e arremessa pedras nos lugares marcados. Com o machado na mão, chama raios e termina arremessando a arma. Fica atordoado com 75%, 50% e 25% da vida. Se ficar sozinho, volta para o céu com a vida cheia.",
    respawn: 30,
  },
  {
    name: "Kazk, a Rainha",
    role: "Chefe",
    levels: "80",
    where: "Muralha das Plantas, na Selva de Jade",
    description:
      "Uma rainha-verme gigante que fica escondida debaixo da terra e sai quando alguém chega a 16 blocos. Morde, corta, investe e ruge, deixando lento quem está por perto. Abaixo da metade da vida se enterra e volta à superfície para atacar. Se ninguém luta com ela, volta para o buraco com a vida cheia.",
    respawn: 30,
  },
  {
    name: "Os Amantes",
    role: "Chefe",
    levels: "110",
    where: "Salão do Castelo dos Yokais, no Refúgio das Pétalas",
    description:
      "Uma luta de samurai em três fases: abaixo de 70% e de 40% da vida, muda de forma. Usa shurikens, flechas que caem do céu e a corrente com foice, e na última fase perde a armadura e chama um fantasma para ajudar.",
    respawn: 30,
  },
  {
    name: "Falso Deus: Lanterna Penitente",
    role: "Chefe",
    levels: "110",
    where: "Templo dos Onis, no Refúgio das Pétalas",
    description:
      "Começa como uma estátua e acorda quando alguém chega a 8 blocos, bate ou clica nela. Luta como penitente e, abaixo da metade da vida, desaba e se levanta como o falso deus. Invoca lanternas que atiram e o curam num ritual; lanternas quebradas soltam centopeias.",
    respawn: 30,
  },
  {
    name: "Bodhisattva Guanyin",
    role: "Chefe",
    levels: "110",
    where: "Templo de Guanyin, no Refúgio das Pétalas",
    description:
      "Outra estátua que acorda ao som de um sino quando alguém chega a 8 blocos, bate ou clica nela. Ataca com pilares de luz e mãos gigantes. Volta a ser estátua 5 segundos depois que todos vão embora.",
    respawn: 30,
  },
  {
    name: "Kriger",
    role: "Chefe",
    levels: "180",
    where: "Caverna dos Lagartos",
    description:
      "Dorme acorrentado e invulnerável até alguém chegar a 20 blocos. Ataca a cada 2 segundos com cortes de espada e cortes fantasmas, e de tempos em tempos solta o sopro da morte nos lugares marcados.",
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
    mapNames: ["Golem de Quartzo", "Golem de Diamante", "Golem de Redstone"],
    description:
      "Golems de cristal maiores que o normal. Pisoteiam, socam o chão, fazem brotar espinhos de cristal nos lugares marcados e arremessam cristais que viram fragmentos.",
    respawn: 10,
  },
  {
    name: "Mestre Oni Samurai",
    role: "Mini-chefe",
    levels: "100",
    where: "Torre da Fortaleza Oni, no Refúgio das Pétalas",
    description:
      "Um samurai oni preto e dourado, cercado de pétalas de cerejeira. Corta todos à sua volta e, de tempos em tempos, desfere um iaijutsu nos lugares marcados.",
    respawn: 10,
  },
  {
    name: "Flor Mutante",
    role: "Mini-chefe",
    levels: "150",
    where: "Entrada da Caverna dos Lagartos",
    description:
      "Guarda a única entrada da caverna: enquanto ela estiver viva, o portão fica fechado. Chama vinhas mutantes e ferrões para lutar ao lado dela.",
    respawn: 10,
  },
  {
    name: "Tezcacoatl, o Ancestral",
    role: "Mini-chefe",
    levels: "180",
    where: "Caverna dos Lagartos",
    description:
      "Um lagarto gigante carmesim e dourado, com uma aura de brasas. Golpeia a área toda, acerta os lugares marcados com o golpe carregado e salta sobre os jogadores.",
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
    name: "Ents",
    mobs: "Ent, Entezinho, Fera de Casca, Devastador e Arremessador; elites: Ent Colosso e Ent Ancião (disfarçado de árvore, agarra quem passa perto)",
    where: "Ents de carvalho nas florestas do Prado Verdejante (26 a 60) e ents de cerejeira no Refúgio das Pétalas (81 a 110)",
  },
  {
    name: "Tooms",
    mobs: "Toom Menino, Menina, Avô, Avó, Professor, Mestre e Bebê, que fogem (a não ser que você segure uma flor-tocha), e o Guerreiro Toom, montado no Besouro-Rinoceronte",
    where: "Bandos raros nas florestas do Prado Verdejante, níveis 26 a 60",
  },
  {
    name: "Ursos e bichos do campo",
    mobs: "Elites: Urso Pardo e Urso Panda. Esquilo, Gambá (solta veneno), Alce, Guaxinim e Sapo, de nível baixo",
    where: "Florestas do Prado Verdejante (26 a 60); os pandas no Refúgio das Pétalas (81 a 110)",
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
  {
    name: "Criaturas da selva",
    mobs: "Cromotério (espreita e agarra pelo pescoço), Ceramtotecídeo, Estrutexímio e sapos que envenenam quem chega perto",
    where: "Selva de Jade, níveis 61 a 80",
  },
  {
    name: "Mosquitos",
    mobs: "Gruda em você e morde a cada 1,5 segundo, tirando 20% da vida máxima, até um dos dois morrer. Um mosquito caçador vai atrás de quem entra na selva",
    where: "Selva de Jade, níveis 61 a 80",
  },
  {
    name: "Murlocs",
    mobs: "Com adaga, lança ou cajado; todo golpe envenena",
    where: "Ilha dos Murlocs, níveis 61 a 70",
  },
  {
    name: "Plantas despertas",
    mobs: "Arbusto Desperto, Cuspidor de Espinhos e Guardião das Vinhas",
    where: "Muralha das Plantas, níveis 71 a 80",
  },
  {
    name: "Bokoblins",
    mobs: "Bokoblin Guerreiro, Bokoblin Espadachim e Bokoblin Xamã (cura os aliados); elite: Moblin Bruto",
    where: "Acampamento Bokoblin, níveis 71 a 80",
  },
  {
    name: "Pássaros berserker",
    mobs: "Pardal Berserker e Melro Berserker, armados de espada",
    where: "Ninho dos Pássaros, níveis 81 a 90",
  },
  {
    name: "Yokais",
    mobs: "Chochinobake, Bakezori, Umibozu e Kamaitachi; elites: Kappa, Tengu, Yurei e Oni",
    where: "Castelo dos Yokais (90 a 110); as elites na Vila dos Yokais (91 a 110)",
  },
  {
    name: "Onis",
    mobs: "Oni Arqueiro, Oni Ninja, Oni Samurai e Oni Miko; elite: Oni Bruto",
    where: "Fortaleza Oni (91 a 100) e Templo dos Onis (101 a 110)",
  },
  {
    name: "Lagartos",
    mobs: "Lagarto Lanceiro, Lagarto Marreteiro, Lagarto Espadachim e Guarda Lagarto de Elite; elite: Lagarto Implacável",
    where: "Caverna dos Lagartos, níveis 165 a 180",
  },
];
