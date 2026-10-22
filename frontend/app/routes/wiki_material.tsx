import { data } from "react-router";
import { pageTitle } from "~/config/site";
import MaterialPage from "~/screens/Wiki/MaterialPage";
import { MATERIAL_BY_SLUG, materialSource } from "~/screens/Wiki/entities";
import type { Route } from "./+types/wiki_material";

export function loader({ params }: Route.LoaderArgs) {
  if (!MATERIAL_BY_SLUG[params.slug]) {
    throw data("Material não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params }: Route.MetaArgs) {
  const material = MATERIAL_BY_SLUG[params.slug];
  if (!material) return [{ title: pageTitle("Wiki") }];
  return [
    { title: pageTitle(`${material.name} · Wiki`) },
    { name: "description", content: `${material.name}: ${materialSource(material)}. Onde é usado.` },
  ];
}

export default function WikiMaterialRoute({ loaderData }: Route.ComponentProps) {
  return <MaterialPage material={MATERIAL_BY_SLUG[loaderData.slug]} />;
}
