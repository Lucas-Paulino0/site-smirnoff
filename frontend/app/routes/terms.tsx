import { SITE, pageTitle } from "~/config/site";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Termos de uso") },
    { name: "description", content: "Termos de uso da loja." },
  ];
}

// Texto base: a equipe deve revisar antes de abrir a loja ao público.
const SECTIONS = [
  {
    title: "1. Sobre a loja",
    text: `A loja do ${SITE.name} vende itens e vantagens digitais usados exclusivamente dentro do servidor. As compras ajudam a manter o servidor no ar e não têm valor fora dele.`,
  },
  {
    title: "2. Entrega",
    text: "Os produtos são entregues automaticamente na conta do nick informado no carrinho, em até 1 hora após a confirmação do pagamento pelo Mercado Pago. Confira o nick antes de pagar: entregas feitas para um nick digitado errado não podem ser transferidas.",
  },
  {
    title: "3. Pagamento",
    text: "Os pagamentos são processados pelo Mercado Pago. Não temos acesso aos dados do seu cartão ou da sua conta bancária.",
  },
  {
    title: "4. Reembolsos",
    text: "Se algo der errado com a sua compra, fale com a equipe antes de abrir uma disputa. Pedidos de reembolso podem ser feitos em até 7 dias após a compra, conforme o Código de Defesa do Consumidor. Estornos abertos sem contato prévio podem resultar na remoção dos itens comprados.",
  },
  {
    title: "5. Regras do servidor",
    text: "Comprar na loja não isenta ninguém das regras do servidor. Punições aplicadas por quebra de regras não geram direito a reembolso.",
  },
  {
    title: "6. Alterações",
    text: "O servidor está em desenvolvimento e o conteúdo dos produtos pode ser ajustado para manter o equilíbrio do jogo. Estes termos podem ser atualizados a qualquer momento.",
  },
  {
    title: "7. Menores de idade",
    text: "Menores de 18 anos devem ter autorização dos pais ou responsáveis para comprar.",
  },
];

export default function Terms() {
  return (
    <main className="page" style={{ maxWidth: 820 }}>
      <SectionHeading as="h1" title="Termos de uso" />
      <article className="parchment" style={{ lineHeight: 1.7 }}>
        {SECTIONS.map((section) => (
          <section key={section.title} style={{ marginBottom: 20 }}>
            <h2 className="title" style={{ fontSize: 22 }}>
              {section.title}
            </h2>
            <p style={{ margin: "6px 0 0" }}>{section.text}</p>
          </section>
        ))}
        <p style={{ margin: 0, fontSize: 14 }}>
          Não somos afiliados à Mojang Studios nem à Microsoft.
        </p>
      </article>
    </main>
  );
}
