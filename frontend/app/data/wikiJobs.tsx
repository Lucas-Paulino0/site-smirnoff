// Artigos das profissões (RPGJobs, no ar desde 2026-10-21). Os números vêm
// de data/jobs.ts, gerado por scripts/gerar-profissoes.py; o texto segue
// a configuração e os menus do plugin.

import {
  CRAFT_BATCH,
  JOB_MAX_LEVEL,
  JOBS,
  RARITIES,
  RECIPE_CATEGORIES,
  SPECIAL_CHANCE,
  SPOTS,
  TOOL_BONUS,
  TOOLS,
  type JobId,
  type Material,
} from "~/data/jobs";
import type { WikiArticle } from "~/data/wiki";
import { levelColor, MAP_AREAS, mapLink } from "~/data/worldMap";
import { Callout, Soon, Table, WikiLink } from "~/screens/Wiki/components";

const jobName = (id: JobId) => JOBS.find((job) => job.id === id)?.name ?? id;

const CRAFTING: { id: JobId; makes: string }[] = [
  { id: "blacksmith", makes: "Espadas, adagas, arcos, cajados e machados. Também repara armas e itens da segunda mão." },
  { id: "armorer", makes: "Capacete, peitoral, calças e botas. Também repara armaduras." },
  { id: "jeweler", makes: "Colares, brincos e anéis de Força, Destreza ou Inteligência." },
  { id: "alchemist", makes: "Poções de Vida, Estamina e Mana." },
  { id: "culinarian", makes: "Pratos que dão bônus por 30 minutos." },
];

const GATHERING: { id: JobId; spot: string; tool: string }[] = [
  { id: "miner", spot: "Veios de minério", tool: "Picareta" },
  { id: "woodcutter", spot: "Árvores", tool: "Machado" },
  { id: "fisher", spot: "Cardumes, na água ou na lava", tool: "Vara" },
  { id: "gatherer", spot: "Canteiros de ervas e flores", tool: "Foice" },
];

// As estações ficam juntas; o link do mapa aponta para o meio delas
const stations = JOBS.flatMap((job) => (job.station ? [job.station] : []));
const STATIONS_CENTER = {
  x: Math.round(stations.reduce((sum, s) => sum + s.x, 0) / stations.length),
  z: Math.round(stations.reduce((sum, s) => sum + s.z, 0) / stations.length),
};

const pct = (value: number) => `${Math.round(value * 100)}%`;

const firstTier = (job: JobId) => RECIPE_CATEGORIES.filter((c) => c.job === job)[0];
const lastTier = (job: JobId) => RECIPE_CATEGORIES.filter((c) => c.job === job).at(-1)!;

function Region({ name }: { name: string }) {
  const area = MAP_AREAS.find((a) => a.name === name);
  return (
    <span className="wiki-region">
      <span style={{ background: levelColor(area?.minLevel ?? 1) }} />
      {name}
    </span>
  );
}

function Materials({ materials }: { materials: Material[] }) {
  return (
    <>
      {materials.map(([name, amount, source], i) => (
        <span key={name} title={source}>
          {i > 0 && ", "}
          {amount} {name}
        </span>
      ))}
    </>
  );
}

const minLevel = (source: string) => Number(source.match(/níveis (\d+)/)?.[1] ?? 0);

// Materiais de monstros usados nas receitas, na ordem do nível
const MOB_MATERIALS = Object.values(
  RECIPE_CATEGORIES.flatMap((c) => c.recipes.flatMap((r) => r.materials)).reduce<
    Record<string, { name: string; source: string }>
  >((acc, [name, , source]) => {
    if (source.includes(", níveis ")) acc[name] ??= { name, source };
    return acc;
  }, {})
).sort((a, b) => minLevel(a.source) - minLevel(b.source));

export const JOB_ARTICLES: WikiArticle[] = [
  {
    slug: "profissoes",
    title: "Profissões",
    icon: "/itens/copper_ore.png",
    summary: "As nove profissões: fabricar, reparar, coletar materiais e comprar ferramentas.",
    keywords:
      "profissão profissões job fabricar craft receita estação ferreiro armadureiro joalheiro alquimista cozinheiro minerador lenhador pescador herbalista coleta coletar ferramenta picareta machado vara foice reparo reparar aparência raridade material",
    sections: [
      {
        id: "profissoes",
        title: "As nove profissões",
        body: (
          <>
            <p>
              Todo jogador pode subir as nove profissões ao mesmo tempo, sem
              escolher uma. Cada uma tem o próprio nível, de 1 a{" "}
              {JOB_MAX_LEVEL}, que sobe com o XP da profissão: você ganha XP
              fabricando ou coletando. As cinco de fabricação usam os materiais
              que as quatro de coleta trazem.
            </p>
            <Table
              head={["Fabricação", "O que faz"]}
              rows={CRAFTING.map((job) => [<strong>{jobName(job.id)}</strong>, job.makes])}
            />
            <Table
              head={["Coleta", "Onde coleta", "Ferramenta"]}
              rows={GATHERING.map((job) => [<strong>{jobName(job.id)}</strong>, job.spot, job.tool])}
            />
          </>
        ),
      },
      {
        id: "estacoes",
        title: "Estações de fabricação",
        body: (
          <>
            <p>
              Cada profissão de fabricação tem uma estação, uma bancada com o
              nome da profissão, o seu nível nela e o aviso{" "}
              <em>Clique para abrir</em> flutuando em cima. As cinco ficam
              juntas no <strong>Refúgio das Pétalas</strong> (
              <WikiLink to={mapLink(STATIONS_CENTER.x, STATIONS_CENTER.z)}>ver no mapa</WikiLink>
              ).
            </p>
            <p>A estação abre o menu da profissão:</p>
            <ol>
              <li>
                <strong>Categorias:</strong> as receitas agrupadas por nível
                (Armas de Cobre, Poções de Camomila...). A categoria do seu
                nível aparece como <strong>★ Recomendado</strong>, e as que
                pedem um nível maior aparecem com cadeado.
              </li>
              <li>
                <strong>Receitas:</strong> cada item mostra os materiais, com ✔
                no que você tem e ✘ no que falta, e o XP que dá.
              </li>
              <li>
                Clique para fabricar um. <strong>Shift + clique</strong> fabrica
                até {CRAFT_BATCH} de uma vez, e o <strong>botão direito</strong>{" "}
                mostra a chance de cada raridade.
              </li>
            </ol>
            <p>
              O botão <strong>Especiais</strong> guarda as receitas ganhas em
              missões e eventos. <Soon />
            </p>
          </>
        ),
      },
      {
        id: "raridade",
        title: "Raridade",
        body: (
          <>
            <p>
              Armas, armaduras, joias e pratos saem com uma raridade sorteada na
              hora: {RARITIES.join(", ")}. Quanto mais raro, mais bônus o item
              traz e, nas armas e armaduras, mais dano, defesa e durabilidade.
              Quanto mais o seu nível passa o nível da receita, maior a chance
              das raridades altas. Os bônus de cada item estão em{" "}
              <WikiLink to="receitas">Receitas</WikiLink>.
            </p>
            <p>
              A raridade <strong>{RARITIES.at(-1)}</strong> aparece com cadeado
              na lista de chances: por enquanto ela fica bloqueada.
            </p>
            <p>
              As poções não têm raridade. No lugar dela, saem num{" "}
              <strong>passo</strong> de 0 a 5: quanto maior o passo, mais a
              poção cura. O passo sobe junto com o seu nível de Alquimista.
            </p>
          </>
        ),
      },
      {
        id: "reparo",
        title: "Reparo",
        body: (
          <p>
            Os itens perdem durabilidade com o uso. No menu do{" "}
            <strong>Ferreiro</strong> (armas, escudos e itens da segunda mão) e
            do <strong>Armadureiro</strong> (armaduras), o botão{" "}
            <strong>Reparar</strong> lista o que está gasto no seu inventário. O
            reparo custa Moedas e alguns materiais, e{" "}
            <strong>Reparar tudo</strong> conserta de uma vez todos os itens que
            você pode pagar.
          </p>
        ),
      },
      {
        id: "aparencias",
        title: "Aparências",
        body: (
          <>
            <p>
              Também no Ferreiro e no Armadureiro, o botão{" "}
              <strong>Aparências</strong> deixa você queimar uma arma ou peça de
              armadura que não foi fabricada (um drop de monstro ou uma
              recompensa de missão). O item é destruído e o visual dele fica
              liberado para você.
            </p>
            <p>
              Depois, escolha o visual ativo de cada tipo de arma e de cada peça
              de armadura: tudo o que você fabricar desse tipo sai com ele. Só a
              aparência muda; os números continuam os da receita.
            </p>
            <Callout type="warning" title="Não tem volta">
              O item queimado some. Itens fabricados não podem ser queimados.
            </Callout>
          </>
        ),
      },
      {
        id: "coleta",
        title: "Coletando",
        body: (
          <>
            <p>
              Os pontos de coleta estão espalhados pelo mapa, em grupos, perto
              das regiões do nível deles. O aviso em cima de cada um diz se dá
              para coletar:
            </p>
            <ul>
              <li>
                <strong>✔ Clique para coletar</strong>
              </li>
              <li>
                <strong>✘ Requer nível:</strong> sua profissão ainda está abaixo
                do nível do ponto.
              </li>
              <li>
                <strong>✘ Requer ferramenta:</strong> falta a ferramenta do
                nível do ponto.
              </li>
            </ul>
            <p>
              Ao clicar, um boneco com a sua skin faz a coleta enquanto você
              assiste. Cada clique coleta uma vez: o material principal do ponto
              e, às vezes, um <strong>achado raro</strong> (cerca de{" "}
              {pct(SPECIAL_CHANCE)} de chance). Veja o que cada ponto dá e onde
              ele fica em <WikiLink to="onde-coletar">Onde coletar</WikiLink>.
            </p>
            <Callout title="Cargas">
              Cada ponto tem 3 cargas para você, e cada coleta gasta uma. Quando
              você gasta a primeira, começa a contar 10 minutos; ao fim deles,
              as três voltam juntas. As cargas são suas: outro jogador no mesmo
              ponto tem as dele.
            </Callout>
          </>
        ),
      },
      {
        id: "ferramentas",
        title: "Ferramentas",
        body: (
          <>
            <p>
              Cada profissão de coleta tem uma ferramenta por faixa de nível,
              da de Madeira (nível 1) à de Pirolita (nível 250). Um ponto pede a
              ferramenta do nível dele, e uma ferramenta acima também serve: cada
              nível a mais dá {pct(TOOL_BONUS["per-level"])} a mais de chance de
              achado, até {pct(TOOL_BONUS.max)}.
            </p>
            <p>
              A primeira ferramenta é de graça. As outras são desbloqueadas na
              loja de ferramentas com Moedas, 36 unidades do material principal
              e 2 do achado raro da faixa anterior (a Picareta de Cobre, de
              nível 10, pede Minério de Cobre e Quartzo, do Veio de Cobre de
              nível 1):
            </p>
            <Table
              head={["Nível", "Ferramentas", "Moedas"]}
              rows={TOOLS.filter((tool) => tool.job === "miner").map((tool) => {
                const metal = tool.name.replace(/^Picareta /, "");
                return [
                  tool.level,
                  `Picareta, Machado, Vara e Foice ${metal}`,
                  tool.money ? tool.money.toLocaleString("pt-BR") : "Grátis",
                ];
              })}
            />
            <p>
              A vara de pescar leva o nome da madeira em vez do metal (Vara de
              Carvalho, Vara de Bétula...). A ferramenta fica desbloqueada para
              sempre.
            </p>
            <Callout title="Loja de ferramentas">
              A loja ainda vai ganhar um personagem nas cidades. <Soon />
            </Callout>
          </>
        ),
      },
      {
        id: "materiais-de-monstros",
        title: "Materiais de monstros",
        body: (
          <>
            <p>
              Toda receita pede também um material que cai de monstros. Os
              monstros comuns e de elite derrubam o material da família deles e
              da faixa de nível em que estão. Mini-chefes e chefes não derrubam
              esses materiais.
            </p>
            <Table
              head={["Material", "Quem derruba"]}
              rows={MOB_MATERIALS.map((m) => [<strong>{m.name}</strong>, m.source])}
            />
          </>
        ),
      },
    ],
  },
  {
    slug: "onde-coletar",
    title: "Onde coletar",
    icon: "/itens/chamomile.png",
    summary: "Os pontos de coleta de cada profissão, com nível, região e o que cada um dá.",
    keywords:
      "coleta coletar ponto spot veio minério árvore tora cardume peixe canteiro erva flor minerador lenhador pescador herbalista ferramenta",
    sections: [
      {
        id: "como-ler",
        title: "Como ler as tabelas",
        body: (
          <p>
            Cada profissão tem um tipo de ponto a cada faixa de nível, do 1 ao
            250. O ponto pede o nível da coluna <strong>Nível</strong> na
            profissão e a ferramenta do mesmo nível. Os de nível alto ficam nas
            regiões mais distantes, como no mapa de{" "}
            <WikiLink to="mundo-e-regioes">Mundo e regiões</WikiLink>. Como
            funciona a coleta está em{" "}
            <WikiLink to="profissoes#coleta">Profissões</WikiLink>.
          </p>
        ),
      },
      ...GATHERING.map((job) => {
        const tools = TOOLS.filter((tool) => tool.job === job.id);
        return {
          id: jobName(job.id).toLowerCase(),
          title: jobName(job.id),
          body: (
            <Table
              head={["Nível", "Região", "Ponto", "Material", "Achado raro", "Ferramenta"]}
              rows={SPOTS.filter((spot) => spot.job === job.id).map((spot) => [
                spot.level,
                <Region name={spot.region} />,
                <strong>{spot.name}</strong>,
                spot.main,
                spot.special,
                tools.find((tool) => tool.level === spot.level)?.name ?? "",
              ])}
            />
          ),
        };
      }),
    ],
  },
  {
    slug: "receitas",
    title: "Receitas",
    icon: "/itens/copper_chestplate.png",
    summary: "Tudo o que as profissões de fabricação fazem, com os materiais e os bônus.",
    keywords:
      "receita receitas craft fabricar arma espada adaga arco cajado machado armadura capacete peitoral calças botas colar brinco anel poção prato comida ferreiro armadureiro joalheiro alquimista cozinheiro",
    sections: [
      {
        id: "como-ler",
        title: "Como ler as tabelas",
        body: (
          <>
            <p>
              As receitas vão do nível 1 ao 80 por enquanto, em categorias de 10
              em 10 níveis. Cada categoria pede o nível dela na profissão. Na
              coluna <strong>Efeito</strong>, o valor vai da raridade Comum à
              Mítica, e <strong>Mítico</strong> lista os bônus da raridade mais
              alta (as raridades de baixo trazem parte deles).
            </p>
            <p>
              Passe o mouse num material para ver de onde ele vem. Como fabricar
              está em <WikiLink to="profissoes#estacoes">Profissões</WikiLink>.
            </p>
            <Callout title="Mais receitas">
              Novas categorias entram conforme as regiões de nível mais alto
              ficam prontas. <Soon />
            </Callout>
          </>
        ),
      },
      ...CRAFTING.map((job) => ({
        id: jobName(job.id)
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .toLowerCase(),
        title: jobName(job.id),
        body: (
          <>
            <p>
              {job.makes} {RECIPE_CATEGORIES.filter((c) => c.job === job.id).length} categorias,
              do nível {firstTier(job.id).level} ao {lastTier(job.id).level}.
            </p>
            {RECIPE_CATEGORIES.filter((c) => c.job === job.id).map((category) => (
              <div key={category.name}>
                <h3>
                  {category.name} · nível {category.level}
                </h3>
                {category.resistance && (
                  <p>Resistem melhor a dano {category.resistance}.</p>
                )}
                <Table
                  head={["Item", "Materiais", "Efeito"]}
                  rows={category.recipes.map((recipe) => [
                    <>
                      <strong>{recipe.name}</strong>
                      {recipe.amount > 1 && ` (faz ${recipe.amount})`}
                      {!recipe.name.startsWith(recipe.kind.split(" ")[0]) && (
                        <>
                          <br />
                          {recipe.kind}
                        </>
                      )}
                    </>,
                    <Materials materials={recipe.materials} />,
                    <>
                      {recipe.stat}
                      {recipe.stat && recipe.bonus.length > 0 && <br />}
                      {recipe.bonus.length > 0 && `Mítico: ${recipe.bonus.join(", ")}`}
                    </>,
                  ])}
                />
              </div>
            ))}
          </>
        ),
      })),
    ],
  },
];
