// Detalhes das páginas de chefe (/wiki/chefes/:slug), escritos a partir de
// /claude/context/mobs.md no servidor (leitura de 2026-10-22). A lista e o
// resumo de cada chefe ficam em data/world.ts.

export type BossDetails = {
  // vida no nível 1, antes da escala de nível (mobs.md, "level-1")
  health: number;
  // dano que ele leva a menos, quando não é o normal
  resists?: string;
  // como ele espera, acorda e volta para o lugar
  waits: string;
  resets?: string;
  // [nome, o que faz]
  attacks: [string, string][];
  phases?: string[];
  helpers?: string;
  // nome da família em MOB_FAMILIES
  family?: string;
};

const BOSS = 37042;
const MINIBOSS = 9878;

export const BOSS_DETAILS: Record<string, BossDetails> = {
  "Cuboss Slime": {
    health: BOSS,
    waits:
      "Dorme espalhado no chão como uma poça até alguém chegar a 16 blocos ou acertá-lo. Então se levanta e luta.",
    resets:
      "Depois de 8 segundos sem luta, derrete, volta para o lugar dele e dorme de novo.",
    attacks: [
      ["Pisão", "Pisa o chão e acerta a arena inteira. Às vezes solta um mini slime."],
      ["Mão de Slime", "Vira para o alvo e esmaga uma faixa à frente; o impacto também alcança a arena."],
      [
        "Chuva de Slime",
        "O golpe forte: cospe slime para o alto e marca o chão sob cada jogador. Pouco depois o slime cai em quem não saiu da marca.",
      ],
    ],
    helpers:
      "Mini slimes verdes, azuis, vermelhos e amarelos que mordem quem está perto e somem em 10 segundos. Não dão recompensa.",
    family: "Mini Slimes",
  },
  "Rainha Bandida Jiaxin": {
    health: 33338,
    resists: "Leva 25% menos dano mágico.",
    waits:
      "Fica parada no alto da fortaleza e só ataca quando alguém chega a 6 blocos.",
    attacks: [
      ["Golpe básico", "Acerta todos os jogadores da arena."],
      ["Golpe forte", "Marca o chão sob cada jogador e acerta quem não saiu da marca."],
    ],
    helpers:
      "Nasce com cinco guardas, três ladinos e dois duelistas, que também esperam alguém chegar perto. Eles dão a recompensa de um bandido comum.",
    family: "Bandidos",
  },
  "Titã da Pedra Rúnica": {
    health: BOSS,
    waits: "Fica imóvel no meio da masmorra até alguém entrar no alcance.",
    attacks: [
      ["Golpe na área", "Um corte em volta dele que também alcança a arena inteira. Faz dois a cada três ataques."],
      ["Esmagamento", "O golpe forte: marca o lugar de cada jogador e, 1 segundo depois, esmaga quem ficou na marca."],
    ],
    helpers:
      "Chama quatro mini golems quando nenhum está vivo. Eles dão a recompensa de um golem comum.",
    family: "Golems",
  },
  "Capitão Barba-Morta": {
    health: BOSS,
    waits: "Espera no lugar dele até alguém chegar perto.",
    attacks: [
      ["Golpe corpo a corpo", "Acerta quem está perto e alcança a arena."],
      ["Canhão ou gancho", "Uma pancada com o canhão ou um combo com o gancho."],
      ["Barragem de canhão", "O golpe forte, a cada 12 segundos: balas caem nos lugares marcados."],
    ],
    phases: [
      "Com 75%, 50% e 25% da vida fica atordoado e chama cinco tripulantes.",
      "Abaixo da metade da vida troca a mão pelo gancho.",
    ],
    helpers:
      "Os tripulantes que ele chama dão a recompensa de um pirata comum. Na ilha, cerca de 1 em cada 8 tripulantes carrega TNT e explode perto dos jogadores.",
    family: "Piratas",
  },
  "O Arquivista": {
    health: BOSS,
    waits:
      "Espera parado até alguém chegar a 10 blocos. Na luta, anda de lado e desvia.",
    attacks: [
      ["Magia em linha", "Uma rajada mágica em linha reta."],
      ["Giro de velas", "Gira velas à sua volta, acertando quem está perto."],
      ["Chuva de livros", "O golpe forte, a cada 12 segundos: livros caem nos lugares marcados."],
    ],
    helpers:
      "No máximo a cada 50 segundos, quando nenhum está vivo, invoca seis Guerreiros de Vela. Eles não dão recompensa.",
    family: "Velas",
  },
  "Senhor da Guerra Kragan": {
    health: BOSS,
    waits:
      "Dorme sentado no trono até alguém chegar a 28 blocos ou acertá-lo. Então salta sobre o jogador mais próximo: a aterrissagem bate três vezes mais forte que um golpe normal em quem estiver a 7 blocos e arremessa todos para longe.",
    resets: "Depois de 8 segundos sem luta, volta para o trono e dorme de novo.",
    attacks: [
      ["Corte Furioso ou Golpe Furioso", "O golpe básico, que alcança a arena."],
      ["Redemoinho", "Gira com a espada, acertando quem está perto."],
      ["Lâmina Infernal", "O golpe forte, a cada 12 segundos: uma lâmina cai em cada lugar marcado."],
    ],
    phases: ["Depois de levar 40 golpes, fica enfurecido."],
    family: "Sentinela Dourado",
  },
  "Rei Golem Corrompido": {
    health: BOSS,
    waits:
      "Dorme no convés da ilha até alguém chegar a 24 blocos ou acertá-lo. O fogo não o machuca.",
    resets:
      "Se ninguém fica a 40 blocos por 5 segundos, volta ao lugar, se cura, some com os cubos e construtos e dorme de novo.",
    attacks: [
      ["Golpe básico", "Ataca a cada 2 segundos: um corte em volta dele que também alcança a arena."],
      ["Golpe forte", "Depois de cinco golpes básicos, acerta o lugar de cada jogador a até 32 blocos."],
    ],
    phases: [
      "Com 75%, 50% e 25% da vida fica atordoado por 5 segundos. Depois de cada vez, surgem 2, 3 e 4 cubos novos.",
    ],
    helpers:
      "Os Cubos Corrompidos curam o rei e soltam Construtos Corrompidos, que atacam os jogadores. Nenhum dos dois dá recompensa.",
    family: "Murlocs",
  },
  Minotauro: {
    health: BOSS,
    waits:
      "Espera escondido no céu, bem acima da arena, e despenca quando alguém entra nela. A queda acerta quem estiver a 9 blocos.",
    resets:
      "Depois de 5 segundos sem luta, ou sem ninguém a 40 blocos, voa de volta para o céu com a vida cheia.",
    attacks: [
      ["Soco, chute, investida e pancada", "Os golpes básicos, que alcançam a arena."],
      [
        "Agarrão",
        "Agarra quem está a 3 blocos por uns 2,5 segundos e esmaga: o esmagamento acerta todos em volta.",
      ],
      ["Pedra", "O golpe forte, a cada 12 segundos: arremessa pedras nos lugares marcados."],
      [
        "Machado",
        "Às vezes chama o machado. Com ele na mão, dá estocadas com raios, faz cair raios nos lugares marcados e termina arremessando o machado nas marcas.",
      ],
    ],
    phases: ["Com 75%, 50% e 25% da vida fica atordoado."],
  },
  "Kazk, a Rainha": {
    health: BOSS,
    waits:
      "Fica escondida debaixo da terra e sai quando alguém chega a 16 blocos ou a acerta.",
    resets:
      "Depois de 5 segundos sem luta, ou sem ninguém a 40 blocos, volta para o buraco com a vida cheia.",
    attacks: [
      ["Mordida, corte e investida", "Ataca a cada 2 segundos. Os golpes básicos alcançam a arena."],
      ["Rugido", "Deixa lento quem está a até 32 blocos."],
      ["Golpe forte", "Depois de cinco golpes básicos, acerta o lugar de cada jogador, 1 segundo depois da marca."],
    ],
    phases: [
      "Abaixo da metade da vida se enterra e volta à superfície: às vezes só pela metade, para morder e cortar, às vezes inteira.",
    ],
    family: "Plantas despertas",
  },
  "Os Amantes": {
    health: BOSS,
    waits:
      "Fica sentado de costas no salão até alguém chegar a 14 blocos ou acertá-lo. Então se levanta e vira para a luta.",
    resets:
      "Se ninguém fica a 80 blocos por 5 segundos, volta para o lugar, para a primeira fase, com a vida cheia, e senta de novo.",
    attacks: [
      ["Combos de samurai", "Dois golpes básicos a cada ciclo, que alcançam a arena. Cada fase tem os seus."],
      ["Lança", "Atordoa por 2 segundos quem estiver a 3 blocos de onde cai."],
      ["Corrente com foice", "Puxa quem estiver perto de onde cai."],
      ["Flecha grande", "Arremessa longe quem estiver perto de onde cai."],
      [
        "Golpe forte",
        "A cada 12 segundos, nos lugares marcados: um salto com corte na primeira fase, chuva de flechas na segunda e um corte longo e carregado na terceira.",
      ],
    ],
    phases: [
      "Abaixo de 70% da vida muda de forma e passa à segunda fase.",
      "Abaixo de 40% desaba, perde a armadura, se levanta na terceira fase e chama um fantasma.",
    ],
    helpers:
      "O Fantasma dos Amantes, na terceira fase: não pode ser derrotado, bate mais fraco que o chefe e some quando o chefe morre.",
    family: "Yokais",
  },
  "Falso Deus: Lanterna Penitente": {
    health: BOSS,
    waits:
      "Começa como uma estátua e acorda quando alguém chega a 8 blocos, bate ou clica nela.",
    resets:
      "Se ninguém fica a 80 blocos por 5 segundos, volta para o lugar, se cura e vira estátua de novo.",
    attacks: [
      ["Corte triplo", "Três projéteis e um corte em volta."],
      ["Pisão e lanternas", "Pisa o chão e faz surgir quatro Lanternas Toro."],
      ["Flauta", "Toca a flauta e solta cinco lanternas voadoras."],
      [
        "Ritual de cura",
        "Uma vez por minuto se cura enquanto houver uma Lanterna Toro de pé. Se a última quebrar, o ritual falha e solta três centopeias.",
      ],
      [
        "Feitiço de raízes",
        "O golpe forte da primeira fase: círculos rúnicos no lugar de cada jogador e em mais quatro pontos. Pouco depois brotam raízes que envenenam e deixam quase parado.",
      ],
      [
        "Golpes do falso deus",
        "Na segunda fase: combos largos, cuspe de veneno, investida, estocada que arremessa longe e o rugido, que vira uma onda nos lugares marcados.",
      ],
    ],
    phases: [
      "Primeira fase: luta como o penitente, com as lanternas.",
      "Abaixo da metade da vida desaba e se levanta como o falso deus.",
    ],
    helpers:
      "Lanternas Toro (atiram raios ou fazem um anel de fogo; metade solta uma centopeia ao quebrar), Centopeias (mordem e envenenam) e Lanternas Voadoras (explodem ao encostar). Nenhuma dá recompensa.",
    family: "Onis",
  },
  "Bodhisattva Guanyin": {
    health: BOSS,
    waits:
      "Começa como uma estátua e acorda ao som de um sino quando alguém chega a 8 blocos, bate ou clica nela.",
    resets: "Volta a ser estátua 5 segundos depois que todos vão embora.",
    attacks: [
      ["Pancada", "Acerta e arremessa quem está perto."],
      ["Linha de explosões", "Explosões em linha que arremessam e queimam."],
      [
        "Cinco palmas",
        "Cinco mãos douradas se juntam em volta dele e voam, uma a uma, até o jogador mais próximo, atravessando paredes.",
      ],
      [
        "Pilares de luz",
        "O golpe forte, a cada 12 segundos: um pilar de luz no lugar de cada jogador. Dá menos de 1 segundo para sair.",
      ],
    ],
  },
  "Pontífice Demoníaco": {
    health: BOSS,
    waits:
      "Dorme em pé, com a espada fincada no chão, até alguém chegar a 20 blocos ou acertá-lo. Acorda num fogo de almas, com um rugido.",
    resets:
      "Depois de 8 segundos sem ninguém a 90 blocos, some num fogo de almas, volta para o lugar e dorme de novo.",
    attacks: [
      ["Combos", "Sequências de golpes em quem está perto."],
      ["Golpe de fogo", "A cada 3 segundos acerta quem está entre 7 e 32 blocos dele: ficar longe não protege."],
      ["Raio", "O golpe forte, a cada 12 segundos: um raio cai no lugar de cada jogador."],
      [
        "Agarrão",
        "Agarra um jogador e o arremessa longe. Se ele estiver com 10% da vida ou menos, é executado na hora.",
      ],
    ],
    helpers:
      "Olhos Demoníacos, que mordem e podem carregar um jogador para o alto por até 7 segundos. Não dão recompensa.",
  },
  Kriger: {
    health: BOSS,
    waits:
      "Dorme acorrentado e invulnerável até alguém chegar a 20 blocos ou acertá-lo. Leva 7 segundos para acordar.",
    resets:
      "Se ninguém fica a 40 blocos por 5 segundos, volta para o lugar, perde os braços fantasmas e dorme acorrentado com a vida cheia.",
    attacks: [
      ["Cortes", "A cada 2 segundos, cortes de espada ou cortes fantasmas em volta dele, que alcançam a arena."],
      [
        "Sopro da morte",
        "O golpe forte, a cada 12 segundos: acerta o lugar de cada jogador, deixa lento e envenena, e deixa uma poça de veneno por 12 segundos.",
      ],
      ["Salto", "Salta sobre quem está de 12 a 24 blocos dele."],
    ],
    phases: [
      "Abaixo da metade da vida ganha braços fantasmas: passa a dar cortes triplos e, a cada 40 segundos, o giro fantasma, que acerta todos e depois quem fica a menos de 7 blocos a cada meio segundo.",
    ],
    family: "Lagartos",
  },
  "Rei Goblin": {
    health: MINIBOSS,
    waits: "Fica no ponto dele no acampamento até alguém chegar perto.",
    attacks: [
      ["Golpe na área", "A cada 3 segundos acerta todos os jogadores da arena."],
      ["Golpe forte", "A cada 10 segundos acerta os lugares marcados."],
    ],
    helpers:
      "Chama ondas de goblins, no máximo três por vez, que dão a recompensa normal. Os xamãs goblins curam o rei.",
    family: "Goblins",
  },
  "Comandante do Martelo": {
    health: MINIBOSS,
    waits: "Fica no castelo dos cavaleiros carmesins até alguém chegar perto.",
    attacks: [
      ["Golpe na área", "A cada 3 segundos acerta todos os jogadores da arena."],
      ["Golpe forte", "A cada 9 segundos acerta os lugares marcados com o martelo."],
    ],
    phases: ["Com metade da vida o escudo quebra."],
    family: "Cavaleiros",
  },
  "Campeão Bandido": {
    health: 8890,
    resists: "Leva 25% menos dano mágico.",
    waits: "Fica parado na parte alta da fortaleza até alguém chegar a 6 blocos.",
    attacks: [
      ["Golpe na área", "Acerta todos os jogadores da arena."],
      ["Golpe forte", "Acerta os lugares marcados."],
    ],
    family: "Bandidos",
  },
  "Golems de Cristal": {
    health: MINIBOSS,
    waits: "Cada um espera no seu ponto de missão até alguém chegar perto.",
    attacks: [
      ["Pisão e pancada", "A cada 3 segundos pisa o chão ou bate com o braço."],
      ["Espinhos de cristal", "O golpe forte: espinhos brotam nos lugares marcados."],
      ["Cristais", "Arremessa cinco cristais, e cada um vira dois fragmentos."],
    ],
    helpers: "Até 10 fragmentos por golem. Não dão recompensa.",
  },
  "Mestre Oni Samurai": {
    health: MINIBOSS,
    waits: "Fica na sala de cima da torre até alguém chegar a 24 blocos.",
    attacks: [
      ["Cortes", "A cada 3 segundos, dois cortes que acertam todos a até 32 blocos."],
      ["Iaijutsu", "O golpe forte: um anel vermelho marca o lugar de cada jogador e, 1 segundo depois, o corte cai."],
    ],
    family: "Onis",
  },
  "Flor Mutante": {
    health: MINIBOSS,
    waits:
      "Fica escondida debaixo da terra e sobe quando alguém chega a 30 blocos ou a acerta. Enraizada, não sai do lugar. Enquanto ela vive, o portão da caverna fica fechado para todos.",
    resets:
      "Se ninguém luta perto dela por 5 segundos, volta para debaixo da terra com a vida cheia e leva as vinhas e os ferrões junto.",
    attacks: [
      [
        "Corte venenoso e espinhos",
        "A cada 3 segundos, um corte em volta dela e espinhos em todos que estão de 7,5 a 32 blocos.",
      ],
      ["Sementes ou raio solar", "O golpe forte, a cada 10 segundos, nos lugares marcados."],
      ["Raízes", "Quem corre perto dela fica preso por 4 segundos."],
    ],
    phases: ["Abaixo da metade da vida entra na segunda fase e chama mais ferrões."],
    helpers:
      "Ferrões a cada 25 segundos (três, ou cinco na segunda fase) e vinhas mutantes perto do jogador mais distante, até seis. Cada vinha derrubada tira 5% da vida máxima da flor. Nenhum dá recompensa.",
    family: "Lagartos",
  },
  "Tezcacoatl, o Ancestral": {
    health: 8890,
    resists: "Leva 25% menos dano mágico.",
    waits: "Fica no ponto dele na caverna até alguém chegar perto.",
    resets:
      "Se ninguém fica a 40 blocos por 5 segundos, volta para o ponto e se cura.",
    attacks: [
      ["Golpe na área", "A cada 3 segundos, um corte em volta dele que alcança a arena."],
      ["Golpe carregado", "A cada três ataques, acerta os lugares marcados."],
      ["Salto esmagador", "Salta e esmaga onde cai."],
    ],
    family: "Lagartos",
  },
};
