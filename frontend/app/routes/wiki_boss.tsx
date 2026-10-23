import { data, redirect } from "react-router";
import { seo } from "~/config/seo";
import { BOSSES, bossPicture, slugify } from "~/data/world";
import BossPage from "~/screens/Wiki/BossPage";
import type { Route } from "./+types/wiki_boss";

const findBoss = (slug: string) => BOSSES.find((boss) => slugify(boss.name) === slug);

// endereços de chefes que mudaram de nome
const RENAMED: Record<string, string> = {
  "cavaleiro-demoniaco": "pontifice-demoniaco",
};

export function loader({ params }: Route.LoaderArgs) {
  if (RENAMED[params.slug]) throw redirect(`/wiki/chefes/${RENAMED[params.slug]}`, 301);
  if (!findBoss(params.slug)) {
    throw data("Chefe não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params, location }: Route.MetaArgs) {
  const boss = findBoss(params.slug);
  if (!boss) return seo({ title: "Wiki", path: location.pathname });
  return seo({
    title: `${boss.name} · Wiki`,
    description: `${boss.role} de nível ${boss.levels}, ${boss.where}. ${boss.description}`,
    path: location.pathname,
    image: bossPicture(boss.name),
  });
}

export default function WikiBossRoute({ loaderData }: Route.ComponentProps) {
  return <BossPage boss={findBoss(loaderData.slug)!} />;
}
