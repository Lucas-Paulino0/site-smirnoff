import { data } from "react-router";
import { pageTitle } from "~/config/site";
import { MOB_FAMILIES, slugify } from "~/data/world";
import FamilyPage from "~/screens/Wiki/FamilyPage";
import type { Route } from "./+types/wiki_family";

const findFamily = (slug: string) => MOB_FAMILIES.find((family) => slugify(family.name) === slug);

export function loader({ params }: Route.LoaderArgs) {
  if (!findFamily(params.slug)) {
    throw data("Família não encontrada", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params }: Route.MetaArgs) {
  const family = findFamily(params.slug);
  if (!family) return [{ title: pageTitle("Wiki") }];
  return [
    { title: pageTitle(`${family.name} · Wiki`) },
    {
      name: "description",
      content: `${family.name}, monstros de nível ${family.levels[0]} a ${family.levels[1]}: onde aparecem, vida e materiais.`,
    },
  ];
}

export default function WikiFamilyRoute({ loaderData }: Route.ComponentProps) {
  return <FamilyPage family={findFamily(loaderData.slug)!} />;
}
