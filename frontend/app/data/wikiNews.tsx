// Artigo de novidades: o que entrou no servidor, por dia. As datas vêm das
// decisões em /claude/decisions e de /claude/context/mobs.md no servidor.
// Ao atualizar o site com conteúdo novo, acrescente um dia no topo.

import type { WikiArticle } from "~/data/wiki";
import { WikiLink } from "~/screens/Wiki/components";
import { BossLink, FamilyLink } from "~/screens/Wiki/entities";

type NewsDay = { date: string; items: React.ReactNode[] };

const NEWS: NewsDay[] = [
  {
    date: "2026-10-22",
    items: [
      <>
        <strong>Party e PvP:</strong> grupos de até 4 jogadores, com painel
        na HUD, e PvP opcional, ligado ou desligado no menu Social. Veja{" "}
        <WikiLink to="party-e-pvp">Party e PvP</WikiLink>.
      </>,
      <>
        Chefes novos no Bosque do Crepúsculo: o{" "}
        <BossLink name="Pontífice Demoníaco" />, nível 140, e a{" "}
        <BossLink name="Enganadora" />, nível 130, que espera disfarçada de
        mulher ferida. A toca dela é cheia de <FamilyLink name="Aranhas" />{" "}
        (121 a 130), que derrubam a Presa Venenosa de Aranha.
      </>,
      <>
        O <BossLink name="Falso Deus: Lanterna Penitente" /> agora só acorda
        com um clique direito na estátua, e antes disso não pode ser atacado.
      </>,
      <>
        <BossLink name="Bodhisattva Guanyin" /> acorda no Templo de Guanyin, e
        o <BossLink name="Mestre Oni Samurai" /> guarda a Fortaleza Oni, cheia
        de <FamilyLink name="Onis" /> (91 a 100).
      </>,
      <>
        Kappa, Tengu, Yurei e Oni, os <FamilyLink name="Yokais" /> de elite,
        na Vila dos Yokais; <FamilyLink name="Pássaros berserker" /> no Ninho
        dos Pássaros.
      </>,
      <>
        Ents de cerejeira, pandas e <FamilyLink name="Cogumelos" /> no lago
        das cerejeiras, no Refúgio das Pétalas.
      </>,
      <>
        Na wiki: páginas para cada item, material, chefe e família de
        monstros, busca em todas as páginas, filtros nas{" "}
        <WikiLink to="receitas#filtrar">Receitas</WikiLink> e a{" "}
        <WikiLink to="calculadora">Calculadora de materiais</WikiLink>.
      </>,
    ],
  },
  {
    date: "2026-10-21",
    items: [
      <>
        <strong>Profissões no ar:</strong> nove profissões, cinco de fabricação
        e quatro de coleta, com as estações no Refúgio das Pétalas e os
        pontos de coleta espalhados pelo mapa. Veja{" "}
        <WikiLink to="profissoes">Profissões</WikiLink> e{" "}
        <WikiLink to="onde-coletar">Onde coletar</WikiLink>.
      </>,
      <>
        <BossLink name="Falso Deus: Lanterna Penitente" /> no Templo dos Onis,
        com os <FamilyLink name="Onis" /> de nível 101 a 110.
      </>,
      <>Cidades e áreas seguras não têm PvP.</>,
    ],
  },
  {
    date: "2026-10-20",
    items: [
      <>
        <BossLink name="Os Amantes" />, uma luta de samurai em três fases, no
        salão do Castelo dos Yokais, cercado de <FamilyLink name="Yokais" />.
      </>,
      <>
        <BossLink name="Kriger" />, que dorme acorrentado na Caverna dos
        Lagartos.
      </>,
    ],
  },
  {
    date: "2026-10-19",
    items: [
      <>
        <BossLink name="Kazk, a Rainha" /> e as{" "}
        <FamilyLink name="Plantas despertas" /> na Muralha das Plantas.
      </>,
      <>
        <BossLink name="Rei Golem Corrompido" /> no convés da Ilha dos
        Murlocs.
      </>,
      <>
        <FamilyLink name="Bokoblins" /> no Acampamento Bokoblin (71 a 80).
      </>,
      <>
        A Caverna dos Lagartos abre com os <FamilyLink name="Lagartos" />{" "}
        (165 a 180) e o <BossLink name="Tezcacoatl, o Ancestral" />. A{" "}
        <BossLink name="Flor Mutante" /> guarda a entrada: enquanto estiver
        viva, o portão fica fechado.
      </>,
    ],
  },
  {
    date: "2026-10-18",
    items: [
      <>
        O <BossLink name="Minotauro" /> despenca do céu na Arena do Minotauro.
      </>,
      <>
        A Selva de Jade ganha <FamilyLink name="Criaturas da selva" />,{" "}
        <FamilyLink name="Mosquitos" /> e <FamilyLink name="Murlocs" />.
      </>,
      <>
        <FamilyLink name="Tooms" /> e <FamilyLink name="Ursos e bichos do campo" />{" "}
        nas florestas do Prado Verdejante.
      </>,
      <>Menu Social, com guilda e party.</>,
    ],
  },
  {
    date: "2026-10-17",
    items: [
      <>
        <strong>Viagem rápida:</strong> o menu de warps das cidades, com a
        Selva de Jade como destino novo. Veja{" "}
        <WikiLink to="mundo-e-regioes#cidades">Cidades e viagem rápida</WikiLink>.
      </>,
    ],
  },
  {
    date: "2026-10-15",
    items: [
      <>
        <BossLink name="Cuboss Slime" /> perto da cratera do spawn, e o{" "}
        <FamilyLink name="Javali" /> no fundo dela.
      </>,
      <>
        <FamilyLink name="Sentinela Dourado" /> nos pátios da fortaleza de
        Kragan.
      </>,
      <>
        <FamilyLink name="Ents" /> de carvalho nas florestas do Prado
        Verdejante.
      </>,
    ],
  },
  {
    date: "2026-10-14",
    items: [
      <>
        <BossLink name="Senhor da Guerra Kragan" /> no trono da fortaleza dele.
      </>,
      <>
        <FamilyLink name="Aranhas" /> no pátio da cidade murada.
      </>,
    ],
  },
  {
    date: "2026-10-13",
    items: [
      <>
        Fortaleza dos Bandidos, com a <BossLink name="Rainha Bandida Jiaxin" />{" "}
        e o <BossLink name="Campeão Bandido" />.
      </>,
      <>
        Ilha Pirata, com o <BossLink name="Capitão Barba-Morta" /> e o
        Crustarax.
      </>,
      <>
        <BossLink name="O Arquivista" /> e os monstros de vela no castelo da
        cidade murada.
      </>,
      <>
        <BossLink name="Titã da Pedra Rúnica" />, os{" "}
        <BossLink name="Golems de Cristal" /> e o{" "}
        <BossLink name="Comandante do Martelo" />.
      </>,
      <>
        Castelos de <FamilyLink name="Cavaleiros" /> carmesins e listrados, e
        esquadrões azuis na cratera.
      </>,
    ],
  },
  {
    date: "2026-10-12",
    items: [
      <>
        <FamilyLink name="Golems" /> na cratera do spawn e cavaleiros
        vermelhos no castelo deles.
      </>,
    ],
  },
  {
    date: "2026-10-11",
    items: [
      <>
        Todo monstro mostra nome, nível e vida acima da cabeça (veja{" "}
        <WikiLink to="monstros#barra-de-vida">Barra de vida e nível</WikiLink>).
      </>,
      <>
        Acampamentos de <FamilyLink name="Goblins" />, cada um com o seu{" "}
        <BossLink name="Rei Goblin" />.
      </>,
    ],
  },
];

const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const dayTitle = (date: string) => {
  const [, month, day] = date.split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]}`;
};

export const NEWS_ARTICLE: WikiArticle = {
  slug: "novidades",
  title: "Novidades",
  icon: "/itens/ancient_amber.png",
  summary: "O que entrou no servidor, dia a dia: chefes, monstros, sistemas e a wiki.",
  keywords: "novidades atualização atualizações patch notas changelog novo novos o que mudou",
  sections: NEWS.map((day) => ({
    id: day.date,
    title: dayTitle(day.date),
    body: (
      <ul>
        {day.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ),
  })),
};
