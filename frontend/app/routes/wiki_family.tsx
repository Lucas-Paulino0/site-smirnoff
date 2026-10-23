import { data, redirect } from "react-router";
import { seo } from "~/config/seo";
import { familyPicture, MOB_FAMILIES, slugify } from "~/data/world";
import FamilyPage from "~/screens/Wiki/FamilyPage";
import type { Route } from "./+types/wiki_family";

const findFamily = (slug: string) => MOB_FAMILIES.find((family) => slugify(family.name) === slug);

// famílias que viraram outras: o endereço antigo leva à lista de famílias
const RENAMED: Record<string, string> = {
  ents: "/wiki/monstros#familias",
  aranhas: "/wiki/monstros#familias",
  cavaleiros: "/wiki/monstros#familias",
};

export function loader({ params }: Route.LoaderArgs) {
  if (RENAMED[params.slug]) throw redirect(RENAMED[params.slug], 301);
  if (!findFamily(params.slug)) {
    throw data("Família não encontrada", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params, location }: Route.MetaArgs) {
  const family = findFamily(params.slug);
  if (!family) return seo({ title: "Wiki", path: location.pathname });
  return seo({
    title: `${family.name} · Wiki`,
    description: `Monstros de nível ${family.levels[0]} a ${family.levels[1]}. ${family.mobs}. ${family.where}.`,
    path: location.pathname,
    image: familyPicture(family.name),
  });
}

export default function WikiFamilyRoute({ loaderData }: Route.ComponentProps) {
  return <FamilyPage family={findFamily(loaderData.slug)!} />;
}
