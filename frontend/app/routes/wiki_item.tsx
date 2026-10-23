import { data } from "react-router";
import { ogIcon, seo } from "~/config/seo";
import ItemPage from "~/screens/Wiki/ItemPage";
import { ITEM_BY_SLUG, MATERIAL_BY_SLUG } from "~/screens/Wiki/entities";
import type { Route } from "./+types/wiki_item";

export function loader({ params }: Route.LoaderArgs) {
  if (!ITEM_BY_SLUG[params.slug]) {
    throw data("Item não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params, location }: Route.MetaArgs) {
  const item = ITEM_BY_SLUG[params.slug];
  if (!item) return seo({ title: "Wiki", path: location.pathname });
  return seo({
    title: `${item.name} · Wiki`,
    description: `${item.kind} de nível ${item.level}${item.stat ? `: ${item.stat}` : ""}. Materiais: ${item.materials
      .map(([slug, n]) => `${n} ${MATERIAL_BY_SLUG[slug]?.name ?? slug}`)
      .join(", ")}.`,
    path: location.pathname,
    image: ogIcon(item.icon),
  });
}

export default function WikiItemRoute({ loaderData }: Route.ComponentProps) {
  return <ItemPage item={ITEM_BY_SLUG[loaderData.slug]} />;
}
