import { data } from "react-router";
import { pageTitle } from "~/config/site";
import ItemPage from "~/screens/Wiki/ItemPage";
import { ITEM_BY_SLUG } from "~/screens/Wiki/entities";
import type { Route } from "./+types/wiki_item";

export function loader({ params }: Route.LoaderArgs) {
  if (!ITEM_BY_SLUG[params.slug]) {
    throw data("Item não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params }: Route.MetaArgs) {
  const item = ITEM_BY_SLUG[params.slug];
  if (!item) return [{ title: pageTitle("Wiki") }];
  return [
    { title: pageTitle(`${item.name} · Wiki`) },
    {
      name: "description",
      content: `${item.name}: ${item.kind.toLowerCase()} de nível ${item.level}. Materiais, raridades e bônus.`,
    },
  ];
}

export default function WikiItemRoute({ loaderData }: Route.ComponentProps) {
  return <ItemPage item={ITEM_BY_SLUG[loaderData.slug]} />;
}
