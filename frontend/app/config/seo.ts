import type { MetaDescriptor } from "react-router";
import { pageTitle, SITE } from "./site";

// Título, descrição e prévia de link (Discord, WhatsApp, Twitter) de uma página

type Seo = {
  // título da página, sem o nome do site; vazio na página inicial
  title?: string;
  description?: string;
  // caminho da página, sem o domínio (location.pathname)
  path: string;
  // imagem própria (ícone ampliado): prévia pequena ao lado do texto
  image?: string;
  // páginas pessoais e de pagamento ficam fora do Google
  noindex?: boolean;
};

const DEFAULT_IMAGE = "/og/hail.png";

export function seo({ title, description, path, image, noindex }: Seo): MetaDescriptor[] {
  const fullTitle = pageTitle(title);
  const url = `${SITE.url}${path}`;
  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { property: "og:site_name", content: SITE.name },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:title", content: title ?? fullTitle },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE.url}${image ?? DEFAULT_IMAGE}` },
    { name: "twitter:card", content: image ? "summary" : "summary_large_image" },
    { tagName: "link", rel: "canonical", href: url },
  ];
  if (!image) {
    tags.push(
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" }
    );
  }
  if (description) {
    tags.push(
      { name: "description", content: description },
      { property: "og:description", content: description }
    );
  }
  if (noindex) tags.push({ name: "robots", content: "noindex" });
  return tags;
}

// Ícone de 16 px ampliado por scripts/gerar-og.py
// (os renders 3D de public/itens/3d já são grandes e ficam como estão)
export const ogIcon = (icon?: string) =>
  icon?.startsWith("/itens/3d/") ? icon : icon?.replace(/^\/itens\//, "/og/itens/");
