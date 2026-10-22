// Conteúdo da wiki. As informações vêm das configurações do servidor
// (RPGCore, RPGClasses, RPGItems, RPGJobs, EternalCore, MythicMobs, menus e
// HUD no hail-admin-kit, conferidas em 2026-10-22). Quando algo mudar no
// jogo, atualize o artigo correspondente aqui. As profissões ficam em
// data/wikiJobs.tsx.

import { SITE } from "~/config/site";
import { CLASS_DETAILS } from "~/data/classDetails";
import {
  CLASSES,
  CLASS_LINES,
  MAX_CLASS_POINTS,
  RARITIES,
  classIcon,
  classesByRarity,
  getClass,
  rarityIcon,
} from "~/data/classes";
import { JOB_ARTICLES } from "~/data/wikiJobs";
import { BOSSES, bossAnchor, MOB_FAMILIES, TOWNS, type Boss } from "~/data/world";
import {
  levelColor,
  MAP_AREAS,
  MAP_BOSSES,
  MAP_TOWNS,
  mapLink,
  SPAWN,
} from "~/data/worldMap";
import {
  Callout,
  Cmd,
  IconList,
  Soon,
  Table,
  WikiLink,
} from "~/screens/Wiki/components";

export type WikiSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

export type WikiArticle = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  // termos extras para a busca
  keywords?: string;
  sections: WikiSection[];
};

export type WikiCategory = {
  title: string;
  articles: string[];
};

const className = (id: string) => getClass(id)?.name ?? id;

const ClassLink = ({ id }: { id: string }) => (
  <WikiLink to={`/classes/${id}`}>{className(id)}</WikiLink>
);

const joinNodes = (nodes: React.ReactNode[]) =>
  nodes.map((node, i) => (
    <span key={i}>
      {i > 0 && (i === nodes.length - 1 ? " e " : ", ")}
      {node}
    </span>
  ));

const classLinks = (ids: string[]) =>
  joinNodes(ids.map((id) => <ClassLink key={id} id={id} />));

const withSkills = CLASSES.filter((c) => CLASS_DETAILS[c.id]?.skills);
const withoutSkills = CLASSES.filter((c) => !CLASS_DETAILS[c.id]?.skills);

// Arma de cada classe, agrupada pelo tipo (weapon-types.yml do RPGItems)
const WEAPONS = Object.values(
  CLASSES.reduce<
    Record<string, { name: string; damage: string; classes: string[] }>
  >((acc, rpgClass) => {
    const weapon = CLASS_DETAILS[rpgClass.id]?.weapon;
    if (!weapon) return acc;
    acc[weapon.name] ??= { name: weapon.name, damage: weapon.damage, classes: [] };
    acc[weapon.name].classes.push(rpgClass.id);
    return acc;
  }, {})
);

// Links "ver no mapa" de um chefe: um por spawner (o Rei Goblin tem cinco)
function BossMapLinks({ boss }: { boss: Boss }) {
  const names = boss.mapNames ?? [boss.name];
  const spots = MAP_BOSSES.filter((b) => names.includes(b.name));
  if (!spots.length) return null;
  if (spots.length === 1) {
    return (
      <p>
        <WikiLink to={mapLink(spots[0].x, spots[0].z)}>Ver no mapa</WikiLink>
      </p>
    );
  }
  return (
    <p>
      Ver no mapa:{" "}
      {joinNodes(
        spots.map((b) => (
          <WikiLink key={`${b.x},${b.z}`} to={mapLink(b.x, b.z)}>
            {b.name === boss.name ? `nível ${b.level}` : `${b.name} (${b.level})`}
          </WikiLink>
        ))
      )}
    </p>
  );
}

const ARTICLE_LIST: WikiArticle[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    icon: classIcon("warrior"),
    summary: "Como entrar no servidor e o que fazer nos primeiros minutos.",
    keywords: "começar iniciar entrar ip versão pacote de recursos whitelist spawn escolher classe",
    sections: [
      {
        id: "requisitos",
        title: "O que você precisa",
        body: (
          <ul>
            <li>
              Minecraft <strong>{SITE.minecraftVersion}</strong>. O servidor
              não aceita a edição Bedrock (celular e console).
            </li>
            <li>
              Estar na <strong>whitelist</strong>: o servidor está em fase
              fechada e só entra quem foi liberado pela equipe.
            </li>
            <li>Nenhum mod é necessário.</li>
          </ul>
        ),
      },
      {
        id: "entrando",
        title: "Entrando no servidor",
        body: (
          <>
            <ol>
              <li>Abra o Minecraft e vá em Multijogador.</li>
              <li>
                Clique em Adicionar servidor e use o endereço{" "}
                <Cmd>{SITE.serverIp}</Cmd>.
              </li>
              <li>
                Ao entrar, <strong>aceite o pacote de recursos</strong>.
              </li>
            </ol>
            <Callout type="warning" title="O pacote de recursos é obrigatório">
              Ele traz os menus, a HUD, os itens, os monstros e os efeitos das
              habilidades. Sem ele não dá para jogar. Quando o pacote é
              atualizado, o servidor manda a versão nova automaticamente, mesmo
              com você online.
            </Callout>
          </>
        ),
      },
      {
        id: "primeira-vez",
        title: "Sua primeira vez",
        body: (
          <>
            <ol>
              <li>
                Logo ao entrar abre o menu <strong>Escolha sua classe</strong>,
                com as quatro classes iniciais:{" "}
                {classLinks(CLASS_LINES.map((line) => line.tiers[0].classes[0]))}.
                Clique numa para ver os detalhes e clique de novo para
                confirmar.
              </li>
              <li>
                Você aparece na <strong>Cratera da Ruína</strong>, a vila do
                spawn. Os monstros mais fracos ficam na própria cratera; quanto
                mais longe você vai, mais fortes eles ficam (veja{" "}
                <WikiLink to="mundo-e-regioes">Mundo e regiões</WikiLink>).
              </li>
              <li>
                Abra o menu principal com <Cmd>/menu</Cmd> e veja suas
                informações em <strong>Info do Jogador</strong>.
              </li>
              <li>
                A cada nível você ganha pontos para distribuir entre os{" "}
                <WikiLink to="atributos">atributos</WikiLink> e, a cada 5
                níveis, um ponto para a árvore de{" "}
                <WikiLink to="habilidades">habilidades</WikiLink>.
              </li>
              <li>
                Armas, armaduras, joias, poções e comida são feitas pelos
                jogadores: colete materiais e fabrique nas{" "}
                <WikiLink to="profissoes">profissões</WikiLink>.
              </li>
            </ol>
            <Callout type="tip" title="A vida não volta sozinha">
              Depois de uma luta, use <Cmd>/descansar</Cmd> para recuperar a
              vida. Veja <WikiLink to="combate-e-descanso">Combate e descanso</WikiLink>.
            </Callout>
          </>
        ),
      },
      {
        id: "viajar",
        title: "Viajando pelo mapa",
        body: (
          <p>
            Use <Cmd>/warp</Cmd> para abrir o menu <strong>Viagem rápida</strong>{" "}
            e ir direto para uma das {TOWNS.length} cidades, e{" "}
            <Cmd>/spawn</Cmd> para voltar à cratera. O servidor não tem{" "}
            <Cmd>/home</Cmd> nem <Cmd>/tpa</Cmd>.
          </p>
        ),
      },
      {
        id: "morte",
        title: "Se você morrer",
        body: (
          <p>
            Você perde 10% do XP do nível atual (30% se quem te derrotou foi
            outro jogador), mas nunca perde um nível. Renasce na sua cama ou
            âncora de renascimento, se tiver uma; caso contrário, volta para o
            spawn. Ao renascer, a vida, a estamina e a mana voltam cheias.
          </p>
        ),
      },
      {
        id: "em-desenvolvimento",
        title: "Servidor em desenvolvimento",
        body: (
          <Callout title="Alguns sistemas ainda estão chegando">
            O {SITE.name} está em desenvolvimento ativo. O que ainda não está
            pronto aparece nesta wiki marcado como <Soon />.
          </Callout>
        ),
      },
    ],
  },
  {
    slug: "regras",
    title: "Regras",
    icon: rarityIcon("base"),
    summary: "O que é e o que não é permitido no servidor.",
    keywords: "punição ban mute hack xray bug exploit spam",
    sections: [
      {
        id: "gerais",
        title: "Regras gerais",
        body: (
          <ol>
            <li>
              <strong>Respeite todo mundo.</strong> Nada de ofensas,
              preconceito, assédio ou ameaças, no chat ou fora dele.
            </li>
            <li>
              <strong>Sem trapaças.</strong> Clientes modificados, x-ray,
              macros e qualquer programa que dê vantagem são proibidos. Mods de
              desempenho e visuais que não dão vantagem são permitidos.
            </li>
            <li>
              <strong>Bugs se reportam, não se exploram.</strong> Encontrou
              uma falha? Avise a equipe. Usar bugs para ganhar vantagem é
              punido.
            </li>
            <li>
              <strong>Sem spam e sem divulgação</strong> de outros servidores,
              links ou propagandas.
            </li>
            <li>
              <strong>Sem comércio com dinheiro real</strong> fora da loja
              oficial: venda de itens, contas ou Moedas é proibida.
            </li>
            <li>
              <strong>Nomes e skins</strong> não podem ser ofensivos.
            </li>
            <li>
              <strong>A palavra final é da equipe.</strong> Em casos não
              previstos aqui, a equipe decide.
            </li>
          </ol>
        ),
      },
      {
        id: "punicoes",
        title: "Punições",
        body: (
          <>
            <p>
              As punições variam com a gravidade e a reincidência: aviso,
              silenciamento no chat, banimento temporário e banimento
              permanente. Trapaças podem levar direto ao banimento.
            </p>
            <p>
              Doar para a <WikiLink to="loja-e-vip">loja</WikiLink> não livra
              ninguém das regras, e punições não dão direito a reembolso.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "niveis-e-experiencia",
    title: "Níveis e experiência",
    icon: rarityIcon("lendarias"),
    summary: "Como você ganha XP, sobe de nível e recebe pontos.",
    keywords: "xp nivel level up pontos evoluir recompensa nível máximo",
    sections: [
      {
        id: "como-funciona",
        title: "Como funciona",
        body: (
          <>
            <p>
              Você ganha experiência (XP) e{" "}
              <WikiLink to="economia">Moedas</WikiLink> ao derrotar monstros.
              Cada ganho aparece na tela como <strong>+XP</strong>, e o chat
              mostra a recompensa de cada abate. Quando a barra enche, você
              sobe de nível e recebe a mensagem{" "}
              <strong>NÍVEL AUMENTADO!</strong>.
            </p>
            <p>
              Cada nível pede um pouco mais de experiência que o anterior. O
              nível máximo é <strong>1000</strong>.
            </p>
          </>
        ),
      },
      {
        id: "recompensas",
        title: "Quanto cada monstro rende",
        body: (
          <>
            <p>
              Monstros mais difíceis pagam mais. Em relação a um monstro comum
              do mesmo nível:
            </p>
            <Table
              head={["Tipo de monstro", "Recompensa"]}
              rows={[
                ["Comum", "1x"],
                ["Elite", "4x"],
                ["Mini-chefe", "20x"],
                ["Chefe", "80x"],
              ]}
            />
            <p>
              Em chefes e mini-chefes, cada jogador que lutou recebe a própria
              recompensa. Quem bate de mais de 32 blocos de distância não
              conta.
            </p>
          </>
        ),
      },
      {
        id: "pontos",
        title: "Pontos de atributo e de classe",
        body: (
          <ul>
            <li>
              A cada nível: <strong>3 pontos de atributo</strong> (veja{" "}
              <WikiLink to="atributos">Atributos</WikiLink>).
            </li>
            <li>
              A cada 5 níveis: <strong>1 ponto de classe</strong>, até{" "}
              {MAX_CLASS_POINTS} no nível 100 (veja{" "}
              <WikiLink to="habilidades">Habilidades</WikiLink>).
            </li>
          </ul>
        ),
      },
      {
        id: "onde-ver",
        title: "Onde acompanhar",
        body: (
          <ul>
            <li>
              <strong>HUD:</strong> a placa de nível fica ao lado do seu
              rosto, e a barra de XP ocupa a parte de baixo da tela, com o
              texto <em>XP atual / XP necessário (%)</em>.
            </li>
            <li>
              <strong>Menu:</strong> <Cmd>/menu</Cmd> → Info do Jogador mostra
              seu nível e os pontos disponíveis.
            </li>
          </ul>
        ),
      },
      {
        id: "evolucao",
        title: "Níveis de evolução",
        body: (
          <p>
            Nos níveis <strong>50</strong> e <strong>100</strong> sua classe
            inicial pode evoluir para a próxima classe da linha. Veja{" "}
            <WikiLink to="classes">Classes</WikiLink>.
          </p>
        ),
      },
    ],
  },
  {
    slug: "atributos",
    title: "Atributos",
    icon: classIcon("paladin"),
    summary: "Os 8 atributos, o que cada um melhora e os seus limites.",
    keywords:
      "vida força destreza inteligência defesa estamina mana agilidade crítico dano stats bônus",
    sections: [
      {
        id: "lista",
        title: "Os 8 atributos",
        body: (
          <Table
            head={["Atributo", "O que melhora", "Limite"]}
            rows={[
              ["Vida", "Vida máxima e a cura ao descansar", "Sem limite"],
              ["Força", "Dano físico", "Sem limite"],
              [
                "Destreza",
                "Dano de projéteis, dano físico (metade do que a Força dá) e velocidade de ataque",
                "Velocidade de ataque até +100%",
              ],
              ["Inteligência", "Dano mágico", "Sem limite"],
              [
                "Defesa",
                "Pontos de defesa e resistência a repulsão",
                "Resistência a repulsão até 100%",
              ],
              ["Estamina", "Estamina máxima e regeneração", "Sem limite"],
              ["Mana", "Mana máxima e regeneração", "Sem limite"],
              [
                "Agilidade",
                "Velocidade de movimento e chance de crítico",
                "Movimento até +50%, crítico até 75%",
              ],
            ]}
          />
        ),
      },
      {
        id: "valores-base",
        title: "Valores iniciais",
        body: (
          <>
            <Table
              head={["Recurso", "Máximo inicial", "Regeneração inicial"]}
              rows={[
                ["Vida", "100", "Só descansando"],
                ["Estamina", "100", "2,5 por segundo"],
                ["Mana", "100", "2 por segundo"],
              ]}
            />
            <p>
              As habilidades de classe gastam estamina ou mana, conforme a
              classe.
            </p>
          </>
        ),
      },
      {
        id: "bonus-de-classe",
        title: "Bônus da classe",
        body: (
          <>
            <p>
              Sua classe soma pontos fixos aos atributos dela, além dos que
              você distribui. Quanto mais rara ou evoluída a classe, maior o
              bônus. Os valores de cada uma estão na página da classe (por
              exemplo, o <ClassLink id="archer" /> ganha +10 Destreza, +3
              Agilidade e +2 Estamina).
            </p>
            <Table
              head={["Classe", "Atributo principal", "Segundo", "Terceiro"]}
              rows={[
                ["Base, nível 1", "+10", "+3", "+2"],
                ["Base, nível 50", "+14", "+4", "+3"],
                ["Base, nível 100", "+18", "+5", "+4"],
                ["Lendária", "+23", "+6", "+6"],
                ["Mítica", "+29", "+7", "+7"],
                ["Secreta", "+36", "+9", "+9"],
                ["Divina", "+46", "+12", "+11"],
              ]}
            />
          </>
        ),
      },
      {
        id: "combate",
        title: "Regras de combate",
        body: (
          <ul>
            <li>
              <strong>Crítico:</strong> todo jogador começa com 5% de chance
              de crítico. O golpe crítico causa <strong>1,5x</strong> o dano.
            </li>
            <li>
              <strong>Defesa:</strong> quanto mais defesa, menos dano você
              recebe. Com <strong>50 pontos de defesa</strong> você recebe
              metade do dano. Cada ponto a mais ajuda um pouco menos que o
              anterior.
            </li>
            <li>
              <strong>Dano físico total</strong> = dano da Força + dano da
              Destreza.
            </li>
          </ul>
        ),
      },
      {
        id: "gastando-pontos",
        title: "Como gastar pontos",
        body: (
          <>
            <ol>
              <li>
                Abra <Cmd>/menu</Cmd> e entre em <strong>Info do Jogador</strong>.
              </li>
              <li>
                Com pontos disponíveis, aparece um botão <strong>+</strong> ao
                lado de cada atributo.
              </li>
              <li>
                O botão ao lado de ATRIBUTOS troca quantos pontos cada clique
                gasta: x1, x5, x10, x25, x50 ou x100.
              </li>
            </ol>
            <Callout type="tip" title="Dica">
              Cada atributo rende um pouco mais a cada nível investido, então
              focar no atributo principal da sua classe costuma valer mais que
              espalhar os pontos.
            </Callout>
          </>
        ),
      },
    ],
  },
  {
    slug: "classes",
    title: "Classes",
    icon: classIcon("archer"),
    summary: "Raridades, linhas de evolução, armas, tickets de troca e como conseguir cada classe.",
    keywords:
      "classe raridade base lendaria mitica secreta divina evoluir ticket troca linha arma escolher",
    sections: [
      {
        id: "raridades",
        title: "Raridades",
        body: (
          <>
            <IconList
              items={RARITIES.map((rarity) => ({
                icon: rarityIcon(rarity.id),
                title: (
                  <span style={{ color: rarity.color }}>
                    {rarity.label} ({classesByRarity(rarity.id).length})
                  </span>
                ),
                text: rarity.how,
              }))}
            />
            <p>
              Veja todas as {CLASSES.length} classes na{" "}
              <WikiLink to="/classes">página de classes</WikiLink>. Cada classe
              tem a sua página, com arma, bônus e habilidades.
            </p>
          </>
        ),
      },
      {
        id: "escolha",
        title: "Escolhendo a primeira classe",
        body: (
          <p>
            Quem ainda não tem classe vê o menu <strong>Escolha sua classe</strong>{" "}
            ao entrar, com as classes iniciais das quatro linhas:{" "}
            {classLinks(CLASS_LINES.map((line) => line.tiers[0].classes[0]))}.
            O primeiro clique marca a classe e mostra os bônus; o segundo
            confirma.
          </p>
        ),
      },
      {
        id: "linhas",
        title: "Linhas base e evolução",
        body: (
          <>
            <p>
              Nos níveis 50 e 100 a classe evolui dentro da mesma linha.
              Quando há mais de uma opção no mesmo nível, você escolhe uma
              delas.
            </p>
            <Table
              head={["Linha", "Nível 1", "Nível 50", "Nível 100"]}
              rows={CLASS_LINES.map((line) => [
                <strong>{line.name}</strong>,
                ...line.tiers.map((tier) =>
                  joinNodes(tier.classes.map((id) => <ClassLink key={id} id={id} />))
                ),
              ])}
            />
          </>
        ),
      },
      {
        id: "tickets",
        title: "Tickets de troca",
        body: (
          <>
            <p>
              Evoluir além da primeira classe da linha custa{" "}
              <strong>1 ticket de troca de classe</strong>. A cada 50 níveis
              você recebe uma missão; ao concluí-la, ganha 1 ticket. O menu de
              classes mostra quantos tickets você tem.
            </p>
            <Callout type="warning" title="Em desenvolvimento">
              As missões que dão tickets ainda estão sendo implementadas. <Soon />
            </Callout>
          </>
        ),
      },
      {
        id: "especiais",
        title: "Classes especiais",
        body: (
          <ul>
            <li>
              <strong>Lendárias</strong> (
              {classLinks(classesByRarity("lendarias").map((c) => c.id))}) e{" "}
              <strong>Míticas</strong> (
              {classLinks(classesByRarity("miticas").map((c) => c.id))}): caem
              de <WikiLink to="chefes">chefes</WikiLink>. <Soon />
            </li>
            <li>
              <strong>Secretas</strong> (
              {classLinks(classesByRarity("secretas").map((c) => c.id))}):
              conquistadas em missões. <Soon />
            </li>
            <li>
              <strong>Divinas</strong> (
              {classLinks(classesByRarity("divinas").map((c) => c.id))}):
              recompensas de doação na{" "}
              <WikiLink to="loja-e-vip">loja</WikiLink>. O Necromante exige
              nível 100.
            </li>
          </ul>
        ),
      },
      {
        id: "armas",
        title: "Armas de cada classe",
        body: (
          <>
            <p>
              Cada classe usa um tipo de arma, e as habilidades só funcionam
              com uma arma desse tipo na mão. A dica do item mostra{" "}
              <strong>Compatível</strong> ou <strong>Incompatível</strong> com
              a sua classe.
            </p>
            <Table
              head={["Arma", "Dano", "Classes"]}
              rows={WEAPONS.map((weapon) => [
                <strong>{weapon.name}</strong>,
                weapon.damage,
                classLinks(weapon.classes),
              ])}
            />
            <p>
              Lutam com dois itens: o <ClassLink id="paladin" /> (espada e
              escudo) e {classLinks(["assassin", "dragon_warrior", "flame_warrior"])}{" "}
              (uma arma em cada mão). Veja{" "}
              <WikiLink to="itens-e-equipamentos">Itens e equipamentos</WikiLink>.
            </p>
          </>
        ),
      },
      {
        id: "habilidades",
        title: "Habilidades de classe",
        body: (
          <p>
            {withSkills.length} das {CLASSES.length} classes já têm
            habilidades, passivas e árvore de talentos; faltam{" "}
            {classLinks(withoutSkills.map((c) => c.id))}. <Soon /> Veja como
            funcionam em <WikiLink to="habilidades">Habilidades</WikiLink>.
          </p>
        ),
      },
    ],
  },
  {
    slug: "habilidades",
    title: "Habilidades",
    icon: classIcon("ninja"),
    summary:
      "Como usar as habilidades de classe, ganhar pontos e montar sua árvore de talentos.",
    keywords:
      "habilidade skill árvore talento pontos de classe barra passiva caminho combo recarga estamina mana",
    sections: [
      {
        id: "como-usar",
        title: "Como usar",
        body: (
          <>
            <ul>
              <li>
                <strong>Habilidade básica:</strong> sai a cada golpe com o
                clique esquerdo, segurando uma arma da sua classe. É grátis e
                já vem liberada.
              </li>
              <li>
                <strong>Barra de habilidades:</strong> aperte <Cmd>F</Cmd>{" "}
                para abrir, escolha a habilidade com as teclas numéricas e use
                com o clique direito. A barra aparece acima da hotbar, com o
                ícone, a recarga e o nome da habilidade escolhida.
              </li>
              <li>
                <strong>Mirar:</strong> algumas habilidades caem onde você
                olha. Enquanto uma delas está escolhida, um anel dourado no
                chão mostra o ponto de impacto; sem um bloco no alcance, ela
                não sai e não gasta nada.
              </li>
              <li>
                <strong>Passivas:</strong> funcionam sozinhas depois de
                liberadas.
              </li>
            </ul>
            <Callout type="warning" title="Precisa da arma certa">
              As habilidades só funcionam com uma arma do tipo da sua classe
              na mão, e cada uso desgasta a arma. Veja as armas em{" "}
              <WikiLink to="classes">Classes</WikiLink>.
            </Callout>
          </>
        ),
      },
      {
        id: "custos",
        title: "Custo e recarga",
        body: (
          <ul>
            <li>
              Cada habilidade da barra gasta <strong>estamina</strong> ou{" "}
              <strong>mana</strong>, conforme a classe. O custo cresce com o
              seu nível (cerca de 2x no nível 20, 4x no 50 e 7,5x no 100),
              acompanhando a regeneração.
            </li>
            <li>
              Cada uma tem seu tempo de recarga. A árvore no jogo mostra o
              custo exato para o seu nível.
            </li>
            <li>A básica e as passivas não custam nada.</li>
          </ul>
        ),
      },
      {
        id: "pontos",
        title: "Pontos de classe e árvore",
        body: (
          <>
            <p>
              Você ganha <strong>1 ponto de classe a cada 5 níveis</strong>,
              até {MAX_CLASS_POINTS} pontos no nível 100. Eles são diferentes
              dos pontos de <WikiLink to="atributos">atributo</WikiLink>. Uma
              classe liberada num nível mais alto já chega com os pontos
              daquele nível (o Ninja, no nível 50, começa com 10).
            </p>
            <p>
              Gaste os pontos na árvore de talentos: <Cmd>/menu</Cmd> → Info
              do Jogador → <strong>Habilidades</strong>. Cada item só libera
              depois do que vem antes dele na árvore.
            </p>
            <Table
              head={["Item da árvore", "Custo"]}
              rows={[
                ["Habilidade da barra", "1 ponto"],
                ["Melhoria I", "1 ponto"],
                ["Melhoria II", "2 pontos (algumas classes: 3)"],
                ["Passiva", "2 pontos (as passivas da classe: grátis ou 1)"],
                ["Caminho final", "3 pontos, com 12 pontos já gastos"],
              ]}
            />
            <Callout type="tip" title="Escolha com cuidado">
              Cada árvore custa de 33 a 35 pontos e o máximo é{" "}
              {MAX_CLASS_POINTS}, então ninguém libera tudo. Os dois caminhos
              finais se excluem: você escolhe um.
            </Callout>
          </>
        ),
      },
      {
        id: "barra",
        title: "Montando a barra",
        body: (
          <ul>
            <li>
              Na árvore, clique numa habilidade liberada e depois num espaço
              da barra. Se já houver outra ali, as duas trocam de lugar.
            </li>
            <li>Clique direito num espaço para esvaziá-lo.</li>
            <li>
              A tecla 1 usa o que está no espaço 1, e assim por diante.
            </li>
          </ul>
        ),
      },
      {
        id: "por-classe",
        title: "Habilidades de cada classe",
        body: (
          <>
            <p>
              Cada classe tem a sua página com a árvore completa: básica,
              barra, melhorias, passivas e caminhos finais, com os mesmos
              textos do jogo.
            </p>
            <Table
              head={["Grupo", "Classes"]}
              rows={[
                ...CLASS_LINES.map((line) => [
                  <strong>Linha do {line.name}</strong>,
                  classLinks(line.tiers.flatMap((tier) => tier.classes)),
                ]),
                ...RARITIES.filter((rarity) => rarity.id !== "base").map(
                  (rarity) => [
                    <strong>{rarity.label}</strong>,
                    classLinks(classesByRarity(rarity.id).map((c) => c.id)),
                  ]
                ),
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    slug: "combate-e-descanso",
    title: "Combate e descanso",
    icon: classIcon("barbarian"),
    summary: "Como funcionam a vida, o descanso, a fome, o PvP e as lutas contra chefes.",
    keywords: "descansar vida regenerar curar fome combate pvp morte chefe arena fúria",
    sections: [
      {
        id: "em-combate",
        title: "Em combate",
        body: (
          <p>
            Você fica <strong>em combate</strong> por 8 segundos depois de
            bater ou apanhar. A vida não regenera sozinha, nem em combate nem
            fora dele: para se curar, descanse ou use itens de cura.
          </p>
        ),
      },
      {
        id: "descansar",
        title: "Descansando",
        body: (
          <>
            <ol>
              <li>
                Fora de combate, parado no chão, use <Cmd>/descansar</Cmd>.
                Você se senta.
              </li>
              <li>
                Sentado, a vida volta bem rápido. Cada 4 segundos de cura
                gastam 1 ponto de fome; com a vida cheia, não gasta nada.
              </li>
              <li>Agache para levantar. Levar um golpe também te levanta.</li>
            </ol>
            <Callout title="Precisa estar alimentado">
              Com a fome zerada não dá para descansar: coma algo antes.
            </Callout>
          </>
        ),
      },
      {
        id: "fome-e-morte",
        title: "Fome e morte",
        body: (
          <ul>
            <li>
              Passar fome machuca, mas para quando sua vida chega a 5% do
              máximo.
            </li>
            <li>
              Morrer custa 10% do XP do nível atual, ou 30% se quem te derrotou
              foi outro jogador. Você nunca perde um nível.
            </li>
            <li>
              Ao morrer e renascer, vida, estamina e mana voltam cheias. Ao
              sair e entrar de novo, a vida continua a mesma.
            </li>
            <li>O chat não mostra mensagens de morte.</li>
          </ul>
        ),
      },
      {
        id: "monstros",
        title: "Monstros e chefes",
        body: (
          <ul>
            <li>
              Um monstro que fica 8 segundos sem lutar recupera 10% da vida
              por segundo: não dá para bater, fugir e voltar.
            </li>
            <li>
              A luta contra um chefe acontece numa arena de 32 blocos: de mais
              longe você não acerta o chefe, e ele não te acerta.
            </li>
            <li>
              Chefes acertam a arena inteira com o golpe básico e marcam no
              chão onde vai cair o golpe forte: saia da marca.
            </li>
            <li>
              Quem tenta fugir para longe leva um salto do chefe, e luta longa
              demais deixa o chefe <strong>furioso</strong>, batendo mais
              forte.
            </li>
          </ul>
        ),
      },
      {
        id: "pvp",
        title: "PvP",
        body: (
          <p>
            O PvP é opcional: cada jogador liga ou desliga o seu no menu
            Social. Entre jogadores o dano é bem reduzido: dois do mesmo nível
            precisam de cerca de 25 golpes para se derrotar. As regras estão em{" "}
            <WikiLink to="party-e-pvp">Party e PvP</WikiLink>.
          </p>
        ),
      },
    ],
  },
  {
    slug: "party-e-pvp",
    title: "Party e PvP",
    icon: classIcon("assassin"),
    summary: "Jogue em grupo de até 4 e ligue o PvP para ganhar mais XP.",
    keywords:
      "party grupo time equipe convite convidar expulsar pvp jogador contra jogador duelo matar social xp bônus",
    sections: [
      {
        id: "menu-social",
        title: "Menu Social",
        body: (
          <p>
            Abra o <Cmd>/menu</Cmd> e clique em <strong>Social</strong>. Lá
            ficam a <strong>Party</strong>, a <strong>Guilda</strong>{" "}
            <Soon /> e, embaixo, os cartões <strong>PVP</strong>,{" "}
            <strong>Ranking</strong> <Soon /> e <strong>Amigos</strong>{" "}
            <Soon />.
          </p>
        ),
      },
      {
        id: "party",
        title: "Party",
        body: (
          <>
            <p>
              Uma party junta até <strong>4 jogadores</strong>, contando o
              líder. Para montar a sua:
            </p>
            <ol>
              <li>
                No menu Social, clique em <strong>Party</strong> e depois em{" "}
                <strong>Convidar</strong>. A lista mostra as cabeças dos
                jogadores online que estão sem party; use{" "}
                <strong>Pesquisar</strong> para achar alguém pelo nome.
              </li>
              <li>
                Clique na cabeça para mandar o convite. Convidar a primeira
                pessoa cria a party, com você de líder.
              </li>
              <li>
                Quem é convidado recebe uma mensagem no chat: clicar nela (ou
                usar <Cmd>/party</Cmd>) abre o menu com os convites pendentes,
                e um clique aceita.
              </li>
            </ol>
            <p>
              No menu da party aparecem o líder e os membros com o nível de
              cada um. Os botões <strong>Expulsar</strong> e{" "}
              <strong>Sair</strong> ficam embaixo.
            </p>
          </>
        ),
      },
      {
        id: "em-grupo",
        title: "Jogando em grupo",
        body: (
          <ul>
            <li>
              Membros da mesma party não se machucam: nada de dano, efeitos
              negativos, empurrões ou atordoamentos entre vocês, mesmo com o
              PvP ligado.
            </li>
            <li>
              Curas e bônus das habilidades só alcançam quem é da sua party.
            </li>
            <li>
              O XP e as Moedas de um monstro são divididos entre os membros que
              estão a até 48 blocos dele.
            </li>
            <li>
              Num chefe, a recompensa é dividida pelo dano causado, e a party
              conta como a soma do dano dos membros.
            </li>
            <li>
              Na HUD, no meio do lado esquerdo, um painel mostra os outros
              membros: cabeça, nome, nível e vida.
            </li>
          </ul>
        ),
      },
      {
        id: "pvp",
        title: "PvP",
        body: (
          <>
            <p>
              O PvP começa desligado. O cartão <strong>PVP</strong> do menu
              Social mostra se o seu está ligado e troca com um clique, mas
              só dentro de uma área segura: a vila do spawn e as{" "}
              {TOWNS.length - 1} outras cidades.
            </p>
            <ul>
              <li>
                Com o PvP ligado você ganha <strong>+20% de XP</strong>.
              </li>
              <li>
                Fora das áreas seguras, dois jogadores com o PvP ligado podem
                se atacar. Quem está com ele desligado não ataca nem é atacado
                por outros jogadores.
              </li>
              <li>
                Fora das áreas seguras, quem está com o PvP ligado mostra em
                cima da cabeça uma placa com espadas cruzadas, o nível e a
                barra de vida.
              </li>
              <li>
                Ser derrotado por outro jogador custa 30% do XP do nível, em
                vez dos 10% de uma morte normal.
              </li>
            </ul>
            <Callout type="warning" title="Pense antes de sair da cidade">
              Como o PvP só troca dentro das áreas seguras, quem sai com ele
              ligado fica com ele ligado até voltar a uma cidade.
            </Callout>
          </>
        ),
      },
    ],
  },
  {
    slug: "itens-e-equipamentos",
    title: "Itens e equipamentos",
    icon: classIcon("gunslinger"),
    summary: "Armas, escudos, acessórios, raridade dos itens e de onde eles vêm.",
    keywords: "item arma escudo acessório colar brinco anel raridade comum raro épico lendário mítico durabilidade reparo fabricar",
    sections: [
      {
        id: "itens-rpg",
        title: "Itens RPG",
        body: (
          <>
            <p>
              Os itens do servidor têm nível, requisitos e bônus próprios.
              Passe o mouse num item para ver a dica dele:
            </p>
            <ul>
              <li>
                <strong>Raridade:</strong> Comum, Incomum, Raro, Épico,
                Lendário ou Mítico.
              </li>
              <li>
                <strong>Tipo e valor base:</strong> o dano da arma, ou a
                defesa e a vida da armadura, em destaque.
              </li>
              <li>
                <strong>Requisitos:</strong> nível, atributos e classe, com um
                ✔ ou ✘ para você.
              </li>
              <li>
                <strong>Bônus</strong> que o item dá enquanto está equipado.
              </li>
              <li>
                <strong>Durabilidade:</strong> os itens se desgastam com o uso
                e são reparados no Ferreiro e no Armadureiro.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "de-onde-vem",
        title: "De onde vêm os itens",
        body: (
          <>
            <p>
              Os itens RPG são fabricados pelos jogadores nas{" "}
              <WikiLink to="profissoes">profissões</WikiLink>: armas no
              Ferreiro, armaduras no Armadureiro, colares, brincos e anéis no
              Joalheiro, poções no Alquimista e pratos no Cozinheiro. A
              raridade é sorteada na hora de fabricar. A lista completa está em{" "}
              <WikiLink to="receitas">Receitas</WikiLink>.
            </p>
            <p>
              Itens especiais que caem de chefes e que vêm de missões estão a
              caminho. <Soon />
            </p>
          </>
        ),
      },
      {
        id: "segunda-mao",
        title: "Segunda mão",
        body: (
          <ul>
            <li>
              <strong>Escudo:</strong> qualquer classe pode usar um escudo RPG
              na segunda mão. Ele soma a defesa base dele, mas você causa 25%
              menos dano.
            </li>
            <li>
              <strong>Segunda arma:</strong> só para{" "}
              {classLinks(["assassin", "dragon_warrior", "flame_warrior"])}.
              Também tira 25% do dano causado.
            </li>
            <li>
              O <ClassLink id="paladin" /> precisa do escudo na segunda mão
              para usar as habilidades.
            </li>
            <li>
              Poções, comida e itens comuns podem ir na segunda mão
              normalmente.
            </li>
          </ul>
        ),
      },
      {
        id: "acessorios",
        title: "Acessórios",
        body: (
          <>
            <p>
              Colares, brincos e anéis vão no menu{" "}
              <strong>Equipamentos</strong> (<Cmd>/menu</Cmd> ou o botão no
              lugar da mesa de criação 2x2 do inventário). Cada acessório só
              entra no espaço do seu tipo, e os requisitos são conferidos na
              hora. Um acessório de outra classe entra, mas não dá bônus.
            </p>
            <Table
              head={["Espaços", "Jogador", "Herói", "Monarca", "Divindade"]}
              rows={[
                ["Colares", "1", "2", "3", "4"],
                ["Brincos", "2", "3", "4", "5"],
                ["Anéis", "4", "6", "8", "10"],
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    slug: "mundo-e-regioes",
    title: "Mundo e regiões",
    icon: classIcon("phoenix_hunter"),
    summary: "O continente, as cidades, as faixas de nível e as masmorras.",
    keywords: "mapa região bioma spawn cratera cidadela cidade warp viagem nível masmorra dungeon",
    sections: [
      {
        id: "mapa",
        title: "O mapa",
        body: (
          <>
            <a href="/mapa">
              <img
                className="pixelated wiki-image"
                src="/mapa-do-mundo/mundo.webp"
                alt="O mundo do servidor visto de cima, com as cidades e as áreas de nível"
                width={864}
                height={672}
              />
            </a>
            <p>
              Este é o mundo de verdade, renderizado bloco por bloco a partir
              dos arquivos do servidor. Na{" "}
              <WikiLink to="/mapa">página do mapa</WikiLink> dá para dar zoom
              até ver cada bloco, ligar as zonas de nível e achar cidades,
              chefes e locais com monstros com as coordenadas exatas.
            </p>
            <p>
              O mapa tem uma borda: perto da cordilheira que cerca o
              continente aparece o aviso de que você chegou ao limite.
            </p>
          </>
        ),
      },
      {
        id: "regioes",
        title: "Regiões e níveis",
        body: (
          <>
            <p>
              O nível dos monstros sobe conforme você se afasta da cratera do
              spawn. Cada região é dividida em faixas de uns 10 níveis.
            </p>
            <Table
              head={["Região", "Níveis", "Como é"]}
              rows={MAP_AREAS.map((area) => [
                <span className="wiki-region">
                  <span style={{ background: levelColor(area.minLevel) }} />
                  {area.name}
                </span>,
                `${area.minLevel} a ${area.maxLevel}`,
                area.description,
              ])}
            />
            <p>
              Entre as regiões há zonas de transição com monstros próprios, e
              as masmorras podem ter níveis diferentes da região em volta
              (algumas passam do nível 300). Veja quem vive onde em{" "}
              <WikiLink to="monstros">Monstros</WikiLink>.
            </p>
          </>
        ),
      },
      {
        id: "cidades",
        title: "Cidades e viagem rápida",
        body: (
          <>
            <p>
              Cidades, pontos de missão e as estradas entre as cidades (16
              blocos para cada lado) são áreas seguras: lá não nascem
              monstros. A exceção é o fundo da cratera, com javalis e mini
              slimes.
            </p>
            <p>
              Use <Cmd>/warp</Cmd> para abrir a <strong>Viagem rápida</strong>,
              com as cidades na ordem da progressão:
            </p>
            <ol>
              {MAP_TOWNS.map((town, i) => (
                <li key={town.warp}>
                  <WikiLink to={mapLink(town.x, town.z, 4)}>{town.name}</WikiLink>
                  {i === 0 && " (spawn)"}
                </li>
              ))}
            </ol>
          </>
        ),
      },
      {
        id: "spawn",
        title: "Spawn",
        body: (
          <p>
            O ponto de chegada fica na Cratera da Ruína, a vila no fundo da
            cratera (<WikiLink to={mapLink(SPAWN.x, SPAWN.z)}>ver no mapa</WikiLink>).
            Use <Cmd>/spawn</Cmd> para voltar para lá a qualquer momento.
          </p>
        ),
      },
    ],
  },
  {
    slug: "monstros",
    title: "Monstros",
    icon: rarityIcon("miticas"),
    summary: "Os tipos de monstro, a cor do nível sobre a cabeça e onde cada família aparece.",
    keywords: "mob monstro elite golem goblin cavaleiro bandido pirata aranha ent slime javali urso toom mosquito murloc planta bokoblin yokai oni lagarto nível barra de vida",
    sections: [
      {
        id: "tipos",
        title: "Tipos de monstro",
        body: (
          <Table
            head={["Tipo", "Como é"]}
            rows={[
              ["Comum", "O monstro do dia a dia, aparece em grupos."],
              ["Elite", "Mais raro, com cerca de 3x a vida e 2,5x o dano de um comum."],
              ["Mini-chefe", "Fica num ponto fixo e tem ataques de chefe."],
              ["Chefe", "O mais forte de cada masmorra, com fases e golpes especiais."],
            ]}
          />
        ),
      },
      {
        id: "barra-de-vida",
        title: "Barra de vida e nível",
        body: (
          <>
            <p>
              Comuns e elites mostram nome, nível e vida acima da cabeça. A cor
              do nível compara o monstro com você:
            </p>
            <ul>
              <li>
                <strong>Verde:</strong> até 2 níveis acima do seu.
              </li>
              <li>
                <strong>Amarelo:</strong> 3 ou mais níveis acima.
              </li>
              <li>
                <strong>Vermelho:</strong> 10 ou mais níveis acima.
              </li>
              <li>
                <strong>Caveira:</strong> 20 ou mais níveis acima. Cuidado.
              </li>
            </ul>
            <p>
              Chefes e mini-chefes aparecem numa barra no topo da tela por 15
              segundos depois que você acerta ou é acertado por eles.
            </p>
          </>
        ),
      },
      {
        id: "familias",
        title: "Onde cada monstro aparece",
        body: (
          <Table
            head={["Família", "Monstros", "Onde"]}
            rows={MOB_FAMILIES.map((family) => [
              <strong>{family.name}</strong>,
              family.mobs,
              family.where,
            ])}
          />
        ),
      },
      {
        id: "regras",
        title: "Regras de nascimento",
        body: (
          <ul>
            <li>Monstros nascem em volta dos jogadores, no chão firme.</li>
            <li>
              Não nascem em cidades, estradas, pontos de missão nem a menos de
              50 blocos de uma masmorra (as masmorras têm os seus).
            </li>
            <li>Os monstros vanilla hostis estão desligados.</li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: "chefes",
    title: "Chefes",
    icon: classIcon("dragon_warrior"),
    summary: "Os chefes e mini-chefes do servidor, seus ataques e recompensas.",
    keywords:
      "boss chefe mini-chefe kragan arquivista capitão barba-morta rainha bandida titã cuboss slime rei goblin golem minotauro kazk kriger amantes falso deus lanterna bodhisattva guanyin flor mutante tezcacoatl oni samurai drop",
    sections: [
      {
        id: "como-funcionam",
        title: "Como funcionam",
        body: (
          <ul>
            <li>
              Ficam parados no lugar deles até alguém se aproximar.
            </li>
            <li>
              Quando morrem, voltam depois de um tempo: 30 minutos os chefes,
              10 minutos os mini-chefes.
            </li>
            <li>
              Cada jogador que lutou ganha a própria recompensa de XP e
              Moedas.
            </li>
            <li>
              As regras de arena, golpes marcados e fúria estão em{" "}
              <WikiLink to="combate-e-descanso">Combate e descanso</WikiLink>.
            </li>
          </ul>
        ),
      },
      ...BOSSES.map((boss) => ({
        id: bossAnchor(boss.name),
        title: boss.name,
        body: (
          <>
            <p>
              <strong>{boss.role}</strong> · nível {boss.levels} · {boss.where}
            </p>
            <p>{boss.description}</p>
            <p>Volta {boss.respawn} minutos depois de derrotado.</p>
            <BossMapLinks boss={boss} />
          </>
        ),
      })),
      {
        id: "mais",
        title: "Próximos chefes",
        body: (
          <p>
            Novos chefes estão a caminho, incluindo os que guardam as classes
            Lendárias e Míticas. <Soon />
          </p>
        ),
      },
    ],
  },
  {
    slug: "menus-e-hud",
    title: "Menus e HUD",
    icon: rarityIcon("secretas"),
    summary: "O menu principal, as telas do personagem e a interface na tela.",
    keywords:
      "menu interface hud barra vida mana tela perfil equipamentos acessório bússola missões classe",
    sections: [
      {
        id: "menu-principal",
        title: "Menu principal",
        body: (
          <>
            <p>
              Abra com <Cmd>/menu</Cmd>. Na parte de cima ficam:
            </p>
            <ul>
              <li>
                <strong>Info do Jogador:</strong> nível, pontos, atributos,
                classe e habilidades.
              </li>
              <li>
                <strong>Equipamentos:</strong> seus colares, brincos e anéis
                (veja <WikiLink to="itens-e-equipamentos">Itens e equipamentos</WikiLink>).
              </li>
              <li>
                <strong>Estilização:</strong> visuais e cosméticos. <Soon />
              </li>
            </ul>
            <p>Na parte de baixo:</p>
            <ul>
              <li>
                <strong>Warps:</strong> a viagem rápida para as cidades, igual
                ao <Cmd>/warp</Cmd>.
              </li>
              <li>
                <strong>Missões:</strong> a missão de troca de classe e até 4
                missões ativas.
              </li>
              <li>
                <strong>Social:</strong> party, PvP e guilda (veja{" "}
                <WikiLink to="party-e-pvp">Party e PvP</WikiLink>).
              </li>
            </ul>
            <p>
              A barra lateral, igual em todos os menus, mostra sua cabeça e
              suas Moedas, e tem atalhos para o correio, o site do servidor
              (manda o link no chat) e o Discord.
            </p>
          </>
        ),
      },
      {
        id: "info-do-jogador",
        title: "Info do Jogador",
        body: (
          <ul>
            <li>Nível e pontos disponíveis</li>
            <li>
              Os 8 atributos, com botões <strong>+</strong> para gastar pontos
              (veja <WikiLink to="atributos">Atributos</WikiLink>)
            </li>
            <li>
              Cartão <strong>Classe</strong>: abre o menu de classes
            </li>
            <li>
              Cartão <strong>Habilidades</strong>: abre a árvore de talentos
              da sua classe (veja <WikiLink to="habilidades">Habilidades</WikiLink>)
            </li>
            <li>
              Cartão <strong>Pets</strong> <Soon />
            </li>
          </ul>
        ),
      },
      {
        id: "menu-de-classes",
        title: "Menu de classes",
        body: (
          <p>
            Aberto pelo cartão Classe. Mostra sua classe atual, as raridades,
            seus tickets de troca e as árvores de evolução de cada linha. Cada
            classe aparece como atual, liberada ou bloqueada (com cadeado).
            Clique numa classe para ver os detalhes: raridade, nível, bônus,
            descrição e habilidades, com recarga e custo para o seu nível.
          </p>
        ),
      },
      {
        id: "hud",
        title: "HUD",
        body: (
          <ul>
            <li>
              <strong>Canto superior esquerdo:</strong> seu rosto numa moldura
              dourada, placa de nível, barras de vida e mana (com os números)
              e as barras de estamina e fome.
            </li>
            <li>
              <strong>Topo:</strong> a bússola, com as direções e os
              marcadores dos lugares e objetivos de missão por perto. Logo
              abaixo, a barra do chefe ou mini-chefe que você está enfrentando.
            </li>
            <li>
              <strong>Meio do lado esquerdo:</strong> os membros da sua party,
              com cabeça, nome, nível e vida.
            </li>
            <li>
              <strong>Lado direito:</strong> até 4 painéis com as suas missões
              ativas.
            </li>
            <li>
              <strong>Acima da hotbar:</strong> a barra de habilidades da sua
              classe, com a recarga de cada uma.
            </li>
            <li>
              <strong>Parte de baixo:</strong> barra de XP na largura da tela,
              com <em>XP atual / necessário (%)</em> no canto.
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: "comandos",
    title: "Comandos",
    icon: classIcon("gale_swordsman"),
    summary: "Os comandos disponíveis para jogadores.",
    keywords: "comando spawn warp msg afk helpop descansar missões quests",
    sections: [
      {
        id: "lista",
        title: "Lista de comandos",
        body: (
          <Table
            head={["Comando", "O que faz"]}
            rows={[
              [<Cmd>/menu</Cmd>, "Abre o menu principal"],
              [<Cmd>/warp</Cmd>, "Viagem rápida para as cidades"],
              [<Cmd>/spawn</Cmd>, "Volta para o spawn (após 5 segundos)"],
              [
                <Cmd>/descansar</Cmd>,
                <>
                  Senta para recuperar a vida (veja{" "}
                  <WikiLink to="combate-e-descanso">Combate e descanso</WikiLink>)
                </>,
              ],
              [<Cmd>/missoes</Cmd>, "Abre as missões (também /quests)"],
              [
                <Cmd>/party</Cmd>,
                <>
                  Abre o menu da party, com os convites pendentes (veja{" "}
                  <WikiLink to="party-e-pvp">Party e PvP</WikiLink>)
                </>,
              ],
              [<Cmd>/msg &lt;jogador&gt; &lt;mensagem&gt;</Cmd>, "Mensagem privada"],
              [<Cmd>/reply &lt;mensagem&gt;</Cmd>, "Responde a última mensagem privada"],
              [<Cmd>/ignore &lt;jogador&gt;</Cmd>, "Para de receber mensagens de alguém"],
              [<Cmd>/afk</Cmd>, "Marca você como ausente"],
              [<Cmd>/disposal</Cmd>, "Abre uma lixeira para jogar itens fora"],
              [<Cmd>/ping</Cmd>, "Mostra a sua latência"],
              [<Cmd>/playtime</Cmd>, "Mostra quanto tempo você já jogou"],
              [
                <Cmd>/helpop &lt;mensagem&gt;</Cmd>,
                "Pede ajuda para a equipe (uma vez por minuto)",
              ],
            ]}
          />
        ),
      },
      {
        id: "vip",
        title: "Comandos de VIP",
        body: (
          <p>
            <Cmd>/enderchest</Cmd>, <Cmd>/anvil</Cmd> e <Cmd>/back</Cmd> a
            partir do Monarca, e <Cmd>/repair</Cmd> na Divindade. Veja{" "}
            <WikiLink to="loja-e-vip">Loja e VIP</WikiLink>.
          </p>
        ),
      },
      {
        id: "limites",
        title: "Limites",
        body: (
          <Table
            head={["", "Aventureiro", "Herói, Monarca e Divindade"]}
            rows={[["Intervalo entre mensagens no chat", "5s", "Sem intervalo"]]}
          />
        ),
      },
      {
        id: "afk",
        title: "Ausência (AFK)",
        body: (
          <p>
            Depois de 10 minutos parado você é marcado como ausente
            automaticamente. Basta voltar a se mexer para sair.
          </p>
        ),
      },
    ],
  },
  {
    slug: "economia",
    title: "Economia",
    icon: "/raridades/divinas.png",
    summary: "As Moedas, o dinheiro do servidor.",
    keywords: "dinheiro moeda moedas money leilão tostão tostões",
    sections: [
      {
        id: "moedas",
        title: "Moedas",
        body: (
          <>
            <p>
              O dinheiro do {SITE.name} é a <strong>Moeda</strong> (plural:
              Moedas). Você ganha Moedas derrotando monstros, junto com a
              experiência: quanto mais forte o monstro, maior a recompensa
              (veja <WikiLink to="niveis-e-experiencia">Níveis e experiência</WikiLink>).
              Cada ganho aparece na tela com o valor recebido.
            </p>
            <p>
              Seu saldo aparece na barra lateral do <Cmd>/menu</Cmd>, abreviado
              quando fica grande (3,5M = 3.500.000). Passe o mouse para ver o
              valor completo.
            </p>
          </>
        ),
      },
      {
        id: "usos",
        title: "Onde usar",
        body: (
          <ul>
            <li>
              <strong>Ferramentas de coleta</strong>, na loja de ferramentas
              (veja <WikiLink to="profissoes#ferramentas">Profissões</WikiLink>)
            </li>
            <li>
              <strong>Reparo</strong> de armas e armaduras no Ferreiro e no
              Armadureiro
            </li>
            <li>
              <strong>Leilão</strong> entre jogadores <Soon />
            </li>
            <li>
              <strong>Patrimônio da guilda</strong> <Soon />
            </li>
          </ul>
        ),
      },
      {
        id: "regras",
        title: "Regras",
        body: (
          <p>
            Vender Moedas ou itens por dinheiro real fora da loja oficial é
            proibido (veja <WikiLink to="regras">Regras</WikiLink>).
          </p>
        ),
      },
    ],
  },
  {
    slug: "guildas-e-missoes",
    title: "Guildas e missões",
    icon: classIcon("cleric"),
    summary: "Os sistemas de guilda e de missões que estão chegando.",
    keywords: "guilda clan missão quest diária história npc diálogo",
    sections: [
      {
        id: "missoes",
        title: "Missões",
        body: (
          <>
            <Callout title="Em desenvolvimento">
              O sistema de missões já está no servidor, mas as primeiras
              missões ainda estão sendo escritas. <Soon />
            </Callout>
            <ul>
              <li>
                <Cmd>/missoes</Cmd> (ou <Cmd>/quests</Cmd>) abre a lista de
                missões, e o cartão <strong>Missões</strong> do{" "}
                <Cmd>/menu</Cmd> mostra a missão de troca de classe e até 4
                missões ativas, com progresso e recompensa.
              </li>
              <li>
                As missões ativas aparecem nos painéis do lado direito da tela,
                e o objetivo atual aparece na bússola.
              </li>
              <li>
                <strong>Missão de troca de classe:</strong> a cada 50 níveis;
                dá 1 ticket de troca ao ser concluída.
              </li>
              <li>
                <strong>Diárias, história e concluídas:</strong> abas próprias
                no menu de missões.
              </li>
              <li>
                Personagens pelo mapa vão dar missões com diálogos próprios.
              </li>
              <li>
                Algumas classes <strong>Secretas</strong> só são conquistadas
                em missões.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "guildas",
        title: "Guildas",
        body: (
          <>
            <Callout title="Em desenvolvimento">
              O sistema de guildas está sendo construído. <Soon />
            </Callout>
            <p>O menu de guilda, no menu Social, já está desenhado e vai mostrar:</p>
            <ul>
              <li>Nome da guilda e o seu cargo nela</li>
              <li>Membros, nível, patrimônio e pontos</li>
              <li>Líder, posição no ranking, conquistas e território</li>
              <li>Botões para ver membros, convidar jogadores e sair</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    slug: "loja-e-vip",
    title: "Loja e VIP",
    icon: rarityIcon("divinas"),
    summary: "O que a loja oferece, benefícios de VIP e como funciona a entrega.",
    keywords: "loja doação doar vip heroi herói monarca divindade pagamento entrega reembolso divina acessório",
    sections: [
      {
        id: "produtos",
        title: "O que tem na loja",
        body: (
          <>
            <p>
              A loja é feita de recompensas de doação: quem doa ajuda a manter
              o servidor no ar e recebe:
            </p>
            <ul>
              <li>
                <strong>Classes Divinas:</strong> desbloqueio permanente das
                classes de raridade Divina.
              </li>
              <li>
                <strong>VIPs:</strong> Herói, Monarca e Divindade, com vantagens
                de conforto por 30 dias.
              </li>
              <li>
                <strong>Tickets de troca</strong> de classe.
              </li>
              <li>
                <strong>Moedas</strong>, o dinheiro do servidor.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "vip",
        title: "VIPs",
        body: (
          <>
            <p>
              Cada VIP tem tudo o que o anterior oferece. A tag aparece no
              chat, no TAB e acima do seu nome.
            </p>
            <Table
              head={["Benefício", "Herói", "Monarca", "Divindade"]}
              rows={[
                ["Tag", "[Herói]", "[Monarca]", "[Divindade]"],
                ["Chat sem intervalo (jogadores: 5s)", "Sim", "Sim", "Sim"],
                [<Cmd>/enderchest</Cmd>, "Não", "Sim", "Sim"],
                [<Cmd>/anvil</Cmd>, "Não", "Sim", "Sim"],
                [<Cmd>/back</Cmd>, "Não", "Sim", "Sim"],
                [<Cmd>/repair</Cmd>, "Não", "Não", "Sim"],
                ["Espaços de colar (jogador: 1)", "2", "3", "4"],
                ["Espaços de brinco (jogador: 2)", "3", "4", "5"],
                ["Espaços de anel (jogador: 4)", "6", "8", "10"],
                ["Duração", "30 dias", "30 dias", "30 dias"],
              ]}
            />
          </>
        ),
      },
      {
        id: "entrega",
        title: "Pagamento e entrega",
        body: (
          <ol>
            <li>Escolha as recompensas e informe seu nick no carrinho.</li>
            <li>A doação é feita pelo Mercado Pago.</li>
            <li>
              As recompensas chegam na conta do nick informado em até{" "}
              <strong>1 hora</strong> após a confirmação.
            </li>
          </ol>
        ),
      },
      {
        id: "termos",
        title: "Termos",
        body: (
          <p>
            Antes de doar, leia os{" "}
            <WikiLink to="/termos">termos de uso</WikiLink>. Acesse a{" "}
            <WikiLink to="/loja">loja</WikiLink>.
          </p>
        ),
      },
    ],
  },
  {
    slug: "perguntas-frequentes",
    title: "Perguntas frequentes",
    icon: rarityIcon("miticas"),
    summary: "Respostas rápidas para as dúvidas mais comuns.",
    keywords: "faq dúvida pergunta ajuda",
    sections: [
      {
        id: "entrar",
        title: "Como entro no servidor?",
        body: (
          <p>
            Com o Minecraft {SITE.minecraftVersion}, adicione o servidor{" "}
            <Cmd>{SITE.serverIp}</Cmd> e aceite o pacote de recursos. Por
            enquanto é preciso estar na whitelist. Veja{" "}
            <WikiLink to="primeiros-passos">Primeiros passos</WikiLink>.
          </p>
        ),
      },
      {
        id: "bedrock",
        title: "Dá para jogar no celular ou no console?",
        body: <p>Não. O servidor é só para a edição Java.</p>,
      },
      {
        id: "mods",
        title: "Preciso instalar algum mod?",
        body: (
          <p>
            Não. Tudo o que é customizado vem no pacote de recursos, que o
            servidor envia automaticamente.
          </p>
        ),
      },
      {
        id: "pacote",
        title: "Recusei o pacote de recursos. E agora?",
        body: (
          <p>
            Edite o servidor na sua lista de Multijogador, mude Pacotes de
            recursos do servidor para Ativado e entre de novo.
          </p>
        ),
      },
      {
        id: "vida",
        title: "Minha vida não regenera. É bug?",
        body: (
          <p>
            Não: no {SITE.name} a vida só volta descansando. Saia de combate
            e use <Cmd>/descansar</Cmd>. Veja{" "}
            <WikiLink to="combate-e-descanso">Combate e descanso</WikiLink>.
          </p>
        ),
      },
      {
        id: "habilidade",
        title: "Minha habilidade não sai. Por quê?",
        body: (
          <p>
            Confira se você está segurando uma arma do tipo da sua classe, se
            tem estamina ou mana suficiente, se a recarga acabou e, nas
            habilidades de mirar, se está olhando para um bloco no alcance.
            Veja <WikiLink to="habilidades">Habilidades</WikiLink>.
          </p>
        ),
      },
      {
        id: "home",
        title: "Tem /home ou /tpa?",
        body: (
          <p>
            Não. Para se locomover, use <Cmd>/warp</Cmd> para ir às cidades e{" "}
            <Cmd>/spawn</Cmd> para voltar à cratera.
          </p>
        ),
      },
      {
        id: "gratis",
        title: "O servidor é pago?",
        body: (
          <p>
            Não, jogar é gratuito. A <WikiLink to="loja-e-vip">loja</WikiLink>{" "}
            é opcional: as doações ajudam a manter o servidor no ar.
          </p>
        ),
      },
      {
        id: "compra",
        title: "Doei e não recebi. O que faço?",
        body: (
          <p>
            A entrega leva até 1 hora depois da confirmação do pagamento.
            Passou disso? Fale com a equipe informando seu nick e o comprovante.
          </p>
        ),
      },
      {
        id: "bug",
        title: "Achei um bug. Onde reporto?",
        body: (
          <p>
            Use <Cmd>/helpop</Cmd> no jogo ou fale com a equipe
            {SITE.discordUrl ? (
              <>
                {" "}no <a href={SITE.discordUrl}>Discord</a>
              </>
            ) : null}
            . Não explore o bug: isso é contra as regras.
          </p>
        ),
      },
    ],
  },
];

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    title: "Começando",
    articles: ["primeiros-passos", "regras", "perguntas-frequentes"],
  },
  {
    title: "Personagem",
    articles: [
      "niveis-e-experiencia",
      "atributos",
      "classes",
      "habilidades",
      "combate-e-descanso",
      "itens-e-equipamentos",
    ],
  },
  {
    title: "Mundo",
    articles: ["mundo-e-regioes", "monstros", "chefes"],
  },
  {
    title: "Profissões",
    articles: ["profissoes", "receitas", "onde-coletar"],
  },
  {
    title: "Sistemas",
    articles: ["party-e-pvp", "menus-e-hud", "comandos", "economia", "guildas-e-missoes"],
  },
  {
    title: "Loja",
    articles: ["loja-e-vip"],
  },
];

ARTICLE_LIST.push(...JOB_ARTICLES);

export const WIKI_ARTICLES: Record<string, WikiArticle> = Object.fromEntries(
  ARTICLE_LIST.map((article) => [article.slug, article])
);

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function searchWiki(query: string): WikiArticle[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return ARTICLE_LIST.filter((article) => {
    const haystack = normalize(
      [
        article.title,
        article.summary,
        article.keywords ?? "",
        ...article.sections.map((section) => section.title),
      ].join(" ")
    );
    return terms.every((term) => haystack.includes(term));
  });
}
