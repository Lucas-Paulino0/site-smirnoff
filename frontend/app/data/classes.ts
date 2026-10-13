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

// Habilidades das classes que já estão no jogo (plugin RPGClasses). Espelha as
// árvores em hail-admin-kit: claude/assets/rpg-classes/**/TREE.md e
// claude/context/classes.md (verificado em 2026-10-02). Os nomes são os que o
// jogador vê no jogo.

export type Skill = { name: string; description: string };

export type BarSkill = Skill & {
  // Melhoria I (1 ponto) e Melhoria II
  upgrades: [Skill, Skill];
};

export type ClassSkills = {
  classId: string;
  base: Skill;
  corePassives: Skill[];
  bar: BarSkill[];
  // Passivas laterais da árvore (2 pontos cada)
  passives: Skill[];
  // Os dois caminhos finais: só um pode ser escolhido
  paths: [Skill, Skill];
  // Custo da Melhoria II
  upgradeIICost: number;
  totalCost: number;
};

export const CLASS_SKILLS: ClassSkills[] = [
  {
    classId: "archer",
    base: {
      name: "Combo Explosivo",
      description:
        "Três disparos seguidos e um quarto tiro carregado que faz o chão tremer ao redor do alvo. O primeiro acerto em cada inimigo causa 50% a mais de dano.",
    },
    corePassives: [],
    bar: [
      {
        name: "Tiro Evasivo",
        description: "Três rajadas de duas flechas enquanto você recua.",
        upgrades: [
          { name: "Estilhaços", description: "Cada flecha atinge até 3 inimigos" },
          { name: "Ponta Afiada", description: "Mais dano" },
        ],
      },
      {
        name: "Saraivada de Flechas",
        description:
          "Um leque de flechas seguido de uma explosão que atordoa os inimigos por 2 segundos.",
        upgrades: [
          { name: "Ruptura Ampla", description: "Explosão maior" },
          { name: "Rajada Forte", description: "Mais dano" },
        ],
      },
      {
        name: "Chuva Perfurante",
        description: "Uma linha de flechas que cai do céu sobre os inimigos.",
        upgrades: [
          { name: "Chão Cravado", description: "Deixa os inimigos atingidos mais lentos" },
          { name: "Chuva Pesada", description: "Mais dano" },
        ],
      },
      {
        name: "Flechas Rápidas",
        description: "Cinco flechas rápidas e três flechas perfurantes mais fortes.",
        upgrades: [
          { name: "Transpassar", description: "As flechas perfurantes atingem até 3 inimigos" },
          { name: "Tiro Firme", description: "Mais dano" },
        ],
      },
      {
        name: "Tiro da Destruição",
        description: "Um disparo devastador que atinge até 5 inimigos numa grande área.",
        upgrades: [
          { name: "Devastação", description: "Atinge até 8 inimigos" },
          { name: "Aniquilação", description: "Mais dano" },
        ],
      },
    ],
    passives: [
      { name: "Recuo Ágil", description: "Agachar dá Velocidade II por 3 segundos (recarga de 8 s)" },
      { name: "Marca do Caçador", description: "A explosão da Saraivada faz os alvos brilharem e os enfraquece por 5 segundos" },
      { name: "Fôlego do Caçador", description: "Recupera vida a cada inimigo derrotado" },
      { name: "Flechas Pesadas", description: "As flechas perfurantes deixam os alvos mais lentos" },
    ],
    paths: [
      {
        name: "Flecha Desperta",
        description:
          "A cada 5 segundos, o próximo acerto do Combo Explosivo, do Tiro Evasivo ou das Flechas Rápidas causa um golpe extra.",
      },
      {
        name: "Guarda do Vendaval",
        description:
          "Ao receber dano, fica imune por 1 segundo e recupera vida (recarga de 10 s).",
      },
    ],
    upgradeIICost: 2,
    totalCost: 34,
  },
  {
    classId: "warrior",
    base: {
      name: "Combo Brutal",
      description: "Uma sequência de cinco golpes que atinge os inimigos ao redor.",
    },
    corePassives: [
      {
        name: "Instinto de Baluarte",
        description:
          "Grátis. Ao receber dano, ganha Resistência III por 5 segundos (recarga de 10 s).",
      },
      {
        name: "Barreira de Sangue",
        description:
          "1 ponto. Segure agachar para erguer uma barreira por 8 segundos que bloqueia 5 golpes; cada bloqueio fere quem está perto (recarga de 9 s).",
      },
    ],
    bar: [
      {
        name: "Salto do Berserker",
        description: "Um salto que corta tudo no caminho e esmaga o chão na queda.",
        upgrades: [
          { name: "Impacto Amplo", description: "Impacto da queda maior" },
          { name: "Queda Brutal", description: "Mais dano" },
        ],
      },
      {
        name: "Redemoinho Implacável",
        description: "Um giro com cinco golpes ao redor, seguido de duas estocadas.",
        upgrades: [
          { name: "Estocada Longa", description: "Estocadas com mais alcance" },
          { name: "Giro Furioso", description: "Mais dano" },
        ],
      },
      {
        name: "Golpe Cruel",
        description: "Rasga o chão numa linha, atingindo até 9 inimigos.",
        upgrades: [
          { name: "Ruptura Larga", description: "Linha mais larga" },
          { name: "Ódio Profundo", description: "Mais dano" },
        ],
      },
      {
        name: "Golpe da Fúria",
        description:
          "Quatro cortes, uma rachadura e uma explosão final que atordoa os inimigos por 4 segundos.",
        upgrades: [
          { name: "Explosão Ampla", description: "Explosão maior" },
          { name: "Fúria Total", description: "Mais dano" },
        ],
      },
    ],
    passives: [
      { name: "Sede de Sangue", description: "Recupera vida a cada inimigo derrotado" },
      { name: "Lâminas Pesadas", description: "O Redemoinho enfraquece os inimigos atingidos" },
      { name: "Golpe Vampírico", description: "Cada Golpe Cruel que acerta recupera um pouco de vida" },
    ],
    paths: [
      {
        name: "Caminho do Berserker",
        description:
          "A cada 5 segundos, o próximo acerto do Combo Brutal ou do Salto do Berserker causa um golpe extra.",
      },
      {
        name: "Caminho do Baluarte",
        description:
          "Ao receber dano, contra-ataca quem bateu e recupera vida (recarga de 8 s).",
      },
    ],
    upgradeIICost: 3,
    totalCost: 33,
  },
  {
    classId: "ninja",
    base: {
      name: "Corte Sangrento",
      description:
        "Um corte rápido; a cada três golpes, um ataque triplo perfurante.",
    },
    corePassives: [
      {
        name: "Estado de Fluxo",
        description:
          "1 ponto. Cada Corte Sangrento aumenta sua velocidade (até Velocidade III). Receber dano zera o bônus.",
      },
    ],
    bar: [
      {
        name: "Laceração",
        description: "Atravessa o inimigo e o corta cinco vezes logo depois.",
        upgrades: [
          { name: "Corte Múltiplo", description: "Atinge até 3 inimigos" },
          { name: "Corte Profundo", description: "Mais dano" },
        ],
      },
      {
        name: "Shuriken Perfurante",
        description:
          "Recua e lança uma shuriken que ricocheteia entre até 4 inimigos e os marca.",
        upgrades: [
          { name: "Ricochete Extra", description: "Ricocheteia em mais um inimigo" },
          { name: "Lâmina Afiada", description: "Mais dano" },
        ],
      },
      {
        name: "Bomba de Fumaça",
        description:
          "Uma nuvem de fumaça por 6 segundos: cega e deixa os inimigos lentos, e deixa você invisível.",
        upgrades: [
          { name: "Névoa Pesada", description: "Inimigos ainda mais lentos" },
          { name: "Refúgio Sombrio", description: "Recupera vida dentro da fumaça" },
        ],
      },
      {
        name: "Avanço Mortal",
        description:
          "Avança girando sobre os inimigos marcados pela shuriken. Precisa de um alvo marcado por perto.",
        upgrades: [
          { name: "Giro Amplo", description: "Área do giro maior" },
          { name: "Investida Letal", description: "Mais dano" },
        ],
      },
      {
        name: "Arte Proibida",
        description:
          "Uma sequência sombria de investidas, giro e cortes no ar, terminando num golpe final em área.",
        upgrades: [
          { name: "Alcance Sombrio", description: "Golpes com mais alcance" },
          { name: "Fúria Sombria", description: "Mais dano" },
        ],
      },
    ],
    passives: [
      { name: "Hemorragia", description: "Laceração e a shuriken fazem o alvo sangrar" },
      { name: "Substituição", description: "Ao receber dano, fica imune por 1 segundo, invisível e mais rápido (recarga de 12 s)" },
      { name: "Emboscada", description: "Estar na sua fumaça fortalece o próximo Avanço Mortal" },
      { name: "Colheita Sombria", description: "Avanço Mortal e o golpe final da Arte Proibida recuperam vida" },
    ],
    paths: [
      {
        name: "Caminho Shinobi",
        description:
          "A cada 5 segundos, o próximo acerto da Laceração ou da shuriken causa um golpe letal extra.",
      },
      {
        name: "Caminho Samurai",
        description:
          "Ao receber dano, contra-ataca quem bateu com um corte e fica imune por um instante (recarga de 6 s).",
      },
    ],
    upgradeIICost: 2,
    totalCost: 35,
  },
];

export const getClassSkills = (id: string) =>
  CLASS_SKILLS.find((skills) => skills.classId === id);

export const getClass = (id: string) => CLASSES.find((c) => c.id === id);

export const getRarity = (id: RarityId) => RARITIES.find((r) => r.id === id)!;

export const classesByRarity = (rarity: RarityId) =>
  CLASSES.filter((c) => c.rarity === rarity);

export const classIcon = (id: string) => `/classes/${id}.png`;

export const rarityIcon = (id: RarityId) => `/raridades/${id}.png`;
