import { Link } from "react-router";
import { SITE, pageTitle } from "~/config/site";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Política de privacidade") },
    {
      name: "description",
      content: "Quais dados o site guarda, para quê e como pedir a exclusão.",
    },
  ];
}

const UPDATED_AT = "13 de outubro de 2026";

const contact = SITE.discordUrl ? (
  <>
    no <a href={SITE.discordUrl} target="_blank" rel="noreferrer">Discord</a>{" "}
    ou pelo <code>/helpop</code> no jogo
  </>
) : (
  <>
    pelo <code>/helpop</code> no jogo
  </>
);

// Texto base: a equipe deve revisar se o site passar a guardar outros dados
// (login, e-mail, analytics). Reflete o que o código faz em outubro de 2026.
const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Quem cuida dos dados",
    body: (
      <p>
        A equipe do {SITE.name} é a responsável pelos dados deste site. Dúvidas
        e pedidos sobre privacidade podem ser feitos {contact}.
      </p>
    ),
  },
  {
    title: "2. O que guardamos",
    body: (
      <ul>
        <li>
          <strong>Nick do Minecraft:</strong> informado por você no carrinho,
          para entregar as recompensas na conta certa.
        </li>
        <li>
          <strong>Dados de cada doação:</strong> nick, recompensas escolhidas,
          valor, data, situação (pendente, aprovada, entregue ou estornada) e o
          número do pagamento no Mercado Pago.
        </li>
        <li>
          <strong>Endereço IP:</strong> usado só na memória do servidor, por
          alguns minutos, para limitar o número de acessos e bloquear abusos.
          Não fica salvo no banco de dados.
        </li>
      </ul>
    ),
  },
  {
    title: "3. O que não guardamos",
    body: (
      <p>
        Não pedimos nome, e-mail, CPF nem senha, e não temos acesso aos dados
        do seu cartão ou da sua conta bancária: o pagamento é feito inteiro no
        Mercado Pago, que segue a política de privacidade dele. O site não usa
        ferramentas de análise de visitas nem anúncios.
      </p>
    ),
  },
  {
    title: "4. Cookies e armazenamento no navegador",
    body: (
      <ul>
        <li>
          <strong>Cookie <code>username</code>:</strong> lembra o seu nick por
          até 1 ano, para você não ter que digitar de novo.
        </li>
        <li>
          <strong>Carrinho:</strong> fica guardado só no seu navegador
          (armazenamento local) até você doar ou esvaziar o carrinho.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Para que usamos",
    body: (
      <p>
        Para processar a doação, entregar as recompensas no jogo, resolver
        problemas de entrega, tratar pedidos de reembolso e estornos e proteger o
        site contra fraudes e abusos. Os dados não são vendidos nem usados para
        propaganda.
      </p>
    ),
  },
  {
    title: "6. Com quem compartilhamos",
    body: (
      <>
        <p>
          Só com os serviços necessários para o site funcionar:
        </p>
        <ul>
          <li>
            <strong>Mercado Pago:</strong> processa os pagamentos.
          </li>
          <li>
            <strong>Supabase:</strong> hospeda o banco de dados, em servidores
            nos Estados Unidos.
          </li>
          <li>
            <strong>Hospedagem do site:</strong> onde o site roda.
          </li>
          <li>
            <strong>Mojang:</strong> o nosso servidor consulta o nick na API
            da Mojang para achar a conta e mostrar a skin certa; a Mojang
            recebe só o nick, não o seu IP.
          </li>
          <li>
            <strong>mc-heads.net:</strong> mostra a skin do nick na loja;
            recebe o identificador da conta (ou o nick) e o seu IP ao
            carregar a imagem.
          </li>
          <li>
            <strong>Google Fonts:</strong> fornece as fontes do site; recebe o
            seu IP ao carregar a página.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Por quanto tempo",
    body: (
      <p>
        Os registros de doação ficam guardados enquanto forem necessários para a
        entrega, para resolver reembolsos e estornos e para cumprir obrigações
        legais. Depois disso podem ser apagados a qualquer momento.
      </p>
    ),
  },
  {
    title: "8. Seus direitos",
    body: (
      <p>
        Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir para saber
        quais dados temos sobre o seu nick, corrigir, ou pedir a exclusão deles.
        Para isso, fale com a equipe {contact}. Registros ligados a uma doação
        podem ser mantidos pelo tempo necessário para tratar reembolsos e
        estornos.
      </p>
    ),
  },
  {
    title: "9. Menores de idade",
    body: (
      <p>
        Menores de 18 anos devem ter autorização dos pais ou responsáveis para
        doar. Veja também os <Link to="/termos">termos de uso</Link>.
      </p>
    ),
  },
  {
    title: "10. Alterações",
    body: (
      <p>
        Esta política pode mudar se o site passar a guardar outros dados. A data
        da última atualização fica no fim da página.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="page">
      <SectionHeading as="h1" title="Política de privacidade" />
      <article className="legal">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="title">
              {section.title}
            </h2>
            <div>{section.body}</div>
          </section>
        ))}
        <p className="legal__footnote">
          Última atualização: {UPDATED_AT}.
        </p>
      </article>
    </main>
  );
}
