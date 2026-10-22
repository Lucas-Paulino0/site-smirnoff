import { Link } from "react-router";
import { SITE, pageTitle } from "~/config/site";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Termos de uso") },
    { name: "description", content: "Termos das doações da loja." },
  ];
}

// Texto base: a equipe deve revisar antes de abrir a loja ao público.
const SECTIONS = [
  {
    title: "1. Sobre as doações",
    text: `A loja do ${SITE.name} recebe doações que ajudam a manter o servidor no ar: hospedagem, desenvolvimento e manutenção. Como agradecimento, cada doação dá ao jogador itens e vantagens digitais usados exclusivamente dentro do servidor. Essas recompensas não têm valor fora do servidor e não podem ser trocadas por dinheiro.`,
  },
  {
    title: "2. Entrega das recompensas",
    text: "As recompensas são entregues automaticamente na conta do nick informado no carrinho, em até 1 hora após a confirmação do pagamento pelo Mercado Pago. Confira o nick antes de doar: entregas feitas para um nick digitado errado não podem ser transferidas.",
  },
  {
    title: "3. Pagamento",
    text: "As doações são processadas pelo Mercado Pago. Não temos acesso aos dados do seu cartão ou da sua conta bancária.",
  },
  {
    title: "4. Reembolsos",
    text: "Se algo der errado com a sua doação, fale com a equipe antes de abrir uma disputa. Pedidos de reembolso podem ser feitos em até 7 dias após a doação. Estornos abertos sem contato prévio podem resultar na remoção das recompensas.",
  },
  {
    title: "5. Regras do servidor",
    text: "Doar não isenta ninguém das regras do servidor. Punições aplicadas por quebra de regras não geram direito a reembolso.",
  },
  {
    title: "6. Alterações",
    text: "O servidor está em desenvolvimento e o conteúdo das recompensas pode ser ajustado para manter o equilíbrio do jogo. Estes termos podem ser atualizados a qualquer momento.",
  },
  {
    title: "7. Menores de idade",
    text: "Menores de 18 anos devem ter autorização dos pais ou responsáveis para doar.",
  },
  {
    title: "8. Privacidade",
    text: (
      <>
        Os dados guardados de cada doação e o uso deles estão na{" "}
        <Link to="/privacidade">política de privacidade</Link>.
      </>
    ),
  },
];

export default function Terms() {
  return (
    <main className="page">
      <SectionHeading as="h1" title="Termos de uso" />
      <article className="legal">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="title">
              {section.title}
            </h2>
            <p>{section.text}</p>
          </section>
        ))}
        <p className="legal__footnote">
          Não somos afiliados à Mojang Studios nem à Microsoft.
        </p>
      </article>
    </main>
  );
}
