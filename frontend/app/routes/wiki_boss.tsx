import { data } from "react-router";
import { pageTitle } from "~/config/site";
import { BOSSES, slugify } from "~/data/world";
import BossPage from "~/screens/Wiki/BossPage";
import type { Route } from "./+types/wiki_boss";

const findBoss = (slug: string) => BOSSES.find((boss) => slugify(boss.name) === slug);

export function loader({ params }: Route.LoaderArgs) {
  if (!findBoss(params.slug)) {
    throw data("Chefe não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params }: Route.MetaArgs) {
  const boss = findBoss(params.slug);
  if (!boss) return [{ title: pageTitle("Wiki") }];
  return [
    { title: pageTitle(`${boss.name} · Wiki`) },
    {
      name: "description",
      content: `${boss.name}, ${boss.role.toLowerCase()} de nível ${boss.levels}: onde fica, ataques, vida e recompensa.`,
    },
  ];
}

export default function WikiBossRoute({ loaderData }: Route.ComponentProps) {
  return <BossPage boss={findBoss(loaderData.slug)!} />;
}
