import { CLASSES } from "./classes";
import { JOB_ITEMS, JOB_MATERIALS } from "./jobs";
import { WIKI_ARTICLES } from "./wiki";
import { BOSSES, bossPath, familyPath, MOB_FAMILIES } from "./world";

// Todas as páginas públicas do site, para o sitemap e o verificador de links
export function publicPaths(): string[] {
  return [
    "/",
    "/classes",
    ...CLASSES.map((c) => `/classes/${c.id}`),
    "/mapa",
    "/wiki",
    ...Object.keys(WIKI_ARTICLES).map((slug) => `/wiki/${slug}`),
    ...BOSSES.map((b) => bossPath(b.name)),
    ...MOB_FAMILIES.map((f) => familyPath(f.name)),
    ...JOB_ITEMS.map((i) => `/wiki/itens/${i.slug}`),
    ...JOB_MATERIALS.map((m) => `/wiki/materiais/${m.slug}`),
    "/loja",
    "/termos",
    "/privacidade",
  ];
}
