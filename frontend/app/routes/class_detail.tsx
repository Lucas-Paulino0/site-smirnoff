import { data } from "react-router";
import ClassDetail from "~/screens/ClassDetail/ClassDetail";
import { seo } from "~/config/seo";
import { classIcon, getClass, getRarity } from "~/data/classes";
import type { Route } from "./+types/class_detail";

export function loader({ params }: Route.LoaderArgs) {
  if (!getClass(params.id)) {
    throw data("Classe não encontrada", { status: 404 });
  }
  return { id: params.id };
}

export function meta({ params, location }: Route.MetaArgs) {
  const rpgClass = getClass(params.id);
  if (!rpgClass) return seo({ title: "Classes", path: location.pathname });
  return seo({
    title: `${rpgClass.name} · Classes`,
    description: `Classe ${getRarity(rpgClass.rarity).label.toLowerCase()} ${rpgClass.name}: como conseguir, arma, bônus e todas as habilidades.`,
    path: location.pathname,
    image: classIcon(rpgClass.id),
  });
}

export default function ClassDetailRoute({ loaderData }: Route.ComponentProps) {
  return <ClassDetail rpgClass={getClass(loaderData.id)!} />;
}
