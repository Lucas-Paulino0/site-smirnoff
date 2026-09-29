// Conteúdo da wiki. As informações vêm das configurações do servidor
// (RPGCore, EternalCore, MythicMobs, menus e HUD no hail-admin-kit).
// Quando algo mudar no jogo, atualize o artigo correspondente aqui.

import { SITE } from "~/config/site";
import {
  CLASS_LINES,
  RARITIES,
  classIcon,
  classesByRarity,
  getClass,
  rarityIcon,
} from "~/data/classes";
import { REGIONS } from "~/data/world";
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

const ARTICLE_LIST: WikiArticle[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    icon: classIcon("warrior"),
    summary: "Como entrar no servidor e o que fazer nos primeiros minutos.",
    keywords: "começar iniciar entrar ip versão pacote de recursos whitelist spawn",
    sections: [
      {
        id: "requisitos",
        title: "O que você precisa",
        body: (
          <>
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
          </>
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
              Ele traz os menus, a HUD, os itens e os modelos do servidor. Sem
              ele não dá para jogar. Quando o pacote é atualizado, o servidor
              manda a versão nova automaticamente, mesmo com você online.
            </Callout>
          </>
        ),
      },
      {
        id: "primeira-vez",
        title: "Sua primeira vez",
        body: (
          <>
            <p>
              Na primeira entrada você aparece no spawn, na{" "}
              <WikiLink to="mundo-e-regioes">Cratera do Início</WikiLink>. De
              lá:
            </p>
            <ol>
              <li>
                Abra o menu principal com <Cmd>/menu</Cmd> e veja suas
                informações em <strong>Info do Jogador</strong>.
              </li>
              <li>
                Conheça as <WikiLink to="classes">classes</WikiLink> e escolha
                uma das quatro linhas base: Arqueiro, Guerreiro, Mago ou
                Assassino.
              </li>
              <li>
                A cada nível você ganha pontos para distribuir entre os{" "}
                <WikiLink to="atributos">atributos</WikiLink>.
              </li>
            </ol>
          </>
        ),
      },
      {
        id: "morte",
        title: "Se você morrer",
        body: (
          <p>
            Você renasce na sua cama ou âncora de renascimento, se tiver uma.
            Caso contrário, volta para o spawn.
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
              oficial: venda de itens, contas ou Tostões é proibida.
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
              Comprar na <WikiLink to="loja-e-vip">loja</WikiLink> não livra
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
    summary: "Como você ganha XP, sobe de nível e recebe pontos de atributo.",
    keywords: "xp nivel level up pontos evoluir",
    sections: [
      {
        id: "como-funciona",
        title: "Como funciona",
        body: (
          <>
            <p>
              Você ganha experiência (XP) em combate e em atividades do
              servidor. Cada ganho aparece na tela como{" "}
              <strong>+XP</strong>. Quando a barra enche, você sobe de nível
              e recebe a mensagem <strong>NÍVEL AUMENTADO!</strong>.
            </p>
            <p>
              Cada nível pede um pouco mais de experiência que o anterior.
            </p>
          </>
        ),
      },
      {
        id: "pontos",
        title: "Pontos de atributo",
        body: (
          <>
            <p>
              A cada nível você recebe <strong>3 pontos de atributo</strong>{" "}
              para gastar como quiser. Todo jogador começa com 0 pontos.
            </p>
            <p>
              Veja como gastar os pontos em{" "}
              <WikiLink to="atributos">Atributos</WikiLink>.
            </p>
          </>
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
            base pode evoluir para a próxima classe da linha. Veja{" "}
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
      "vida força destreza inteligência defesa estamina mana agilidade crítico dano stats",
    sections: [
      {
        id: "lista",
        title: "Os 8 atributos",
        body: (
          <Table
            head={["Atributo", "O que melhora", "Limite"]}
            rows={[
              ["Vida", "Vida máxima e regeneração de vida", "Sem limite"],
              ["Força", "Dano físico", "Sem limite"],
              [
                "Destreza",
                "Dano físico (metade do que a Força dá), dano de projéteis e velocidade de ataque",
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
          <Table
            head={["Recurso", "Máximo inicial", "Regeneração inicial"]}
            rows={[
              ["Vida", "100", "1 por segundo"],
              ["Estamina", "100", "5 por segundo"],
              ["Mana", "100", "2 por segundo"],
            ]}
          />
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
              focar em poucos atributos costuma valer mais que espalhar os
              pontos.
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
    summary: "Raridades, linhas de evolução, tickets de troca e como conseguir cada classe.",
    keywords:
      "classe raridade base lendaria mitica secreta divina evoluir ticket troca linha",
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
              Veja todas as classes com ícones na{" "}
              <WikiLink to="/classes">página de classes</WikiLink>.
            </p>
          </>
        ),
      },
      {
        id: "linhas",
        title: "Linhas base e evolução",
        body: (
          <>
            <p>
              Todo jogador começa em uma das quatro classes base. Nos níveis 50
              e 100 a classe evolui dentro da mesma linha. Quando há mais de
              uma opção no mesmo nível, você escolhe uma delas.
            </p>
            <Table
              head={["Linha", "Nível 1", "Nível 50", "Nível 100"]}
              rows={CLASS_LINES.map((line) => [
                <strong>{line.name}</strong>,
                ...line.tiers.map((tier) =>
                  tier.classes.map(className).join(" ou ")
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
              <strong>Lendárias</strong> ({classesByRarity("lendarias").map((c) => c.name).join(", ")})
              {" "}e <strong>Míticas</strong> (
              {classesByRarity("miticas").map((c) => c.name).join(", ")}):
              caem de <WikiLink to="chefes">chefes</WikiLink>.
            </li>
            <li>
              <strong>Secretas</strong> (
              {classesByRarity("secretas").map((c) => c.name).join(", ")}):
              conquistadas em missões.
            </li>
            <li>
              <strong>Divinas</strong> (
              {classesByRarity("divinas").map((c) => c.name).join(", ")}):
              disponíveis na <WikiLink to="loja-e-vip">loja</WikiLink>. O
              Necromancer exige nível 100.
            </li>
          </ul>
        ),
      },
      {
        id: "bonus",
        title: "Bônus de classe",
        body: (
          <Callout title="Em balanceamento">
            Cada classe vai dar bônus próprios de atributos e habilidades. Os
            valores ainda estão sendo definidos. <Soon />
          </Callout>
        ),
      },
    ],
  },
  {
    slug: "mundo-e-regioes",
    title: "Mundo e regiões",
    icon: classIcon("phoenix_hunter"),
    summary: "O continente, suas regiões e o spawn.",
    keywords: "mapa região bioma spawn cratera cidadela",
    sections: [
      {
        id: "mapa",
        title: "O mapa",
        body: (
          <>
            <img
              className="pixelated wiki-image"
              src="/mapa-do-mundo.png"
              alt="Mapa do mundo"
              width={800}
              height={600}
            />
            <p>
              Versão ampliada na <WikiLink to="/mapa">página do mapa</WikiLink>.
            </p>
          </>
        ),
      },
      {
        id: "regioes",
        title: "Regiões",
        body: (
          <Table
            head={["Região", "Descrição"]}
            rows={REGIONS.map((region) => [
              <span className="wiki-region">
                <span style={{ background: region.color }} />
                {region.name}
              </span>,
              region.description,
            ])}
          />
        ),
      },
      {
        id: "spawn",
        title: "Spawn",
        body: (
          <p>
            O ponto de chegada fica na Cratera do Início. Use{" "}
            <Cmd>/spawn</Cmd> para voltar para lá a qualquer momento.
          </p>
        ),
      },
    ],
  },
  {
    slug: "chefes",
    title: "Chefes",
    icon: classIcon("dragon_warrior"),
    summary: "Os chefes do servidor, seus ataques, fraquezas e recompensas.",
    keywords: "boss chefe fallen devastator mob drop fraqueza",
    sections: [
      {
        id: "fallen-devastator",
        title: "Fallen Devastator",
        body: (
          <>
            <p>
              Um herói caído que empunha um machado em chamas. Quando você
              chega perto, uma barra de vida vermelha aparece no topo da tela
              (a até 40 blocos de distância).
            </p>
            <h4 className="font-pixel">Ataques</h4>
            <ul>
              <li>Golpes corpo a corpo com o machado</li>
              <li>Saltos em cima do alvo</li>
              <li>Ondas de choque que se espalham pelo chão</li>
              <li>Lâminas de fogo e explosões</li>
              <li>Um ataque especial devastador, com animação própria</li>
            </ul>
            <h4 className="font-pixel">Resistências</h4>
            <Table
              head={["Tipo de dano", "Dano recebido", ""]}
              rows={[
                ["Magia", "110%", "Fraco"],
                ["Fogo", "50%", "Resistente"],
                ["Projéteis", "25%", "Muito resistente"],
              ]}
            />
            <h4 className="font-pixel">Recompensas</h4>
            <p>Uma grande quantidade de experiência.</p>
            <Callout type="tip" title="Dica">
              Magos se dão bem contra ele. Flechas quase não causam dano.
            </Callout>
          </>
        ),
      },
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
    keywords: "menu interface hud barra vida mana tela perfil",
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
                <strong>Info do Jogador:</strong> nível, pontos, atributos e
                acesso às classes.
              </li>
              <li>
                <strong>Missões:</strong> missão de troca de classe e missões
                ativas. <Soon />
              </li>
              <li>
                <strong>Guilda:</strong> informações da sua guilda. <Soon />
              </li>
            </ul>
            <p>Na parte de baixo, em Outros recursos:</p>
            <ul>
              <li>
                <strong>Warps:</strong> teleportes para pontos do mapa. <Soon />
              </li>
              <li>
                <strong>Leilão:</strong> compra e venda entre jogadores. <Soon />
              </li>
              <li>
                <strong>Wiki:</strong> atalho para esta wiki.
              </li>
            </ul>
            <p>
              A barra lateral mostra sua cabeça, seus Tostões e atalhos para
              correio, casa e Discord.
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
              Cartões <strong>Classe</strong>, <strong>Habilidades</strong> e{" "}
              <strong>Pets</strong> (os dois últimos: <Soon />)
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
    icon: classIcon("arsenalist"),
    summary: "Os comandos disponíveis para jogadores.",
    keywords: "comando spawn msg afk helpop",
    sections: [
      {
        id: "lista",
        title: "Lista de comandos",
        body: (
          <Table
            head={["Comando", "O que faz"]}
            rows={[
              [<Cmd>/menu</Cmd>, "Abre o menu principal"],
              [<Cmd>/spawn</Cmd>, "Volta para o spawn (após 5 segundos)"],
              [<Cmd>/msg &lt;jogador&gt; &lt;mensagem&gt;</Cmd>, "Mensagem privada"],
              [<Cmd>/afk</Cmd>, "Marca você como ausente"],
              [
                <Cmd>/helpop &lt;mensagem&gt;</Cmd>,
                "Pede ajuda para a equipe (uma vez por minuto)",
              ],
            ]}
          />
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
    summary: "Os Tostões, a moeda do servidor.",
    keywords: "dinheiro moeda tostão tostões money leilão",
    sections: [
      {
        id: "tostoes",
        title: "Tostões",
        body: (
          <>
            <p>
              A moeda do {SITE.name} é o <strong>Tostão</strong> (plural:
              Tostões). Cada ganho aparece na tela com o valor recebido.
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
            Vender Tostões ou itens por dinheiro real fora da loja oficial é
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
    keywords: "guilda clan missão quest diária história",
    sections: [
      {
        id: "guildas",
        title: "Guildas",
        body: (
          <>
            <Callout title="Em desenvolvimento">
              O sistema de guildas está sendo construído. <Soon />
            </Callout>
            <p>O menu de guilda já está desenhado e vai mostrar:</p>
            <ul>
              <li>Nome da guilda e o seu cargo nela</li>
              <li>Membros, nível, patrimônio e pontos</li>
              <li>Líder, posição no ranking, conquistas e território</li>
              <li>Botões para ver membros, convidar jogadores e sair</li>
            </ul>
          </>
        ),
      },
      {
        id: "missoes",
        title: "Missões",
        body: (
          <>
            <Callout title="Em desenvolvimento">
              As missões ainda estão sendo implementadas. <Soon />
            </Callout>
            <ul>
              <li>
                <strong>Missão de troca de classe:</strong> a cada 50 níveis;
                dá 1 ticket de troca ao ser concluída.
              </li>
              <li>
                <strong>Missões ativas:</strong> até 4 ao mesmo tempo, com
                progresso e recompensa.
              </li>
              <li>
                <strong>Diárias, história e concluídas:</strong> abas próprias
                no menu de missões.
              </li>
              <li>
                Algumas classes <strong>Secretas</strong> só são conquistadas
                em missões.
              </li>
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
    keywords: "loja comprar vip heroi herói monarca divindade pagamento entrega reembolso divina",
    sections: [
      {
        id: "produtos",
        title: "O que tem na loja",
        body: (
          <ul>
            <li>
              <strong>Classes Divinas:</strong> as 6 classes de raridade
              Divina, com desbloqueio permanente.
            </li>
            <li>
              <strong>VIPs:</strong> Herói, Monarca e Divindade, com vantagens
              de conforto por 30 dias.
            </li>
            <li>
              <strong>Tickets de troca</strong> de classe.
            </li>
            <li>
              <strong>Tostões</strong>, a moeda do servidor.
            </li>
          </ul>
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
            <li>Escolha os produtos e informe seu nick no carrinho.</li>
            <li>O pagamento é feito pelo Mercado Pago.</li>
            <li>
              Os produtos chegam na conta do nick informado em até{" "}
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
            Antes de comprar, leia os{" "}
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
        id: "gratis",
        title: "O servidor é pago?",
        body: (
          <p>
            Não, jogar é gratuito. A <WikiLink to="loja-e-vip">loja</WikiLink>{" "}
            é opcional e ajuda a manter o servidor no ar.
          </p>
        ),
      },
      {
        id: "compra",
        title: "Comprei e não recebi. O que faço?",
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
    articles: ["niveis-e-experiencia", "atributos", "classes"],
  },
  {
    title: "Mundo",
    articles: ["mundo-e-regioes", "chefes"],
  },
  {
    title: "Sistemas",
    articles: ["menus-e-hud", "comandos", "economia", "guildas-e-missoes"],
  },
  {
    title: "Loja",
    articles: ["loja-e-vip"],
  },
];

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
