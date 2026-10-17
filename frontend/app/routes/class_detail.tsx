import { data } from "react-router";
import ClassDetail from "~/screens/ClassDetail/ClassDetail";
import { pageTitle } from "~/config/site";
import { getClass, getRarity } from "~/data/classes";
import type { Route } from "./+types/class_detail";

export function loader({ params }: Route.LoaderArgs) {
  if (!getClass(params.id)) {
    throw data("Classe não encontrada", { status: 404 });
  }
  return { id: params.id };
}

export function meta({ params }: Route.MetaArgs) {
  const rpgClass = getClass(params.id);
  if (!rpgClass) return [{ title: pageTitle("Classes") }];
  return [
    { title: pageTitle(`${rpgClass.name} · Classes`) },
    {
      name: "description",
      content: `Classe ${getRarity(rpgClass.rarity).label.toLowerCase()} ${rpgClass.name}: como conseguir, arma, bônus e todas as habilidades.`,
    },
  ];
}

export default function ClassDetailRoute({ loaderData }: Route.ComponentProps) {
  return <ClassDetail rpgClass={getClass(loaderData.id)!} />;
}
