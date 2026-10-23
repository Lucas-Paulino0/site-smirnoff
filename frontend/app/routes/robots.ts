import { SITE } from "~/config/site";

// /robots.txt: carrinho, nick e pagamento ficam fora da busca
export function loader() {
  const text = `User-agent: *
Disallow: /loja/carrinho
Disallow: /loja/usuario
Disallow: /compra/
Sitemap: ${SITE.url}/sitemap.xml
`;
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
