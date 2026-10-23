import { data } from "react-router";
import { ogIcon, seo } from "~/config/seo";
import MaterialPage from "~/screens/Wiki/MaterialPage";
import { MATERIAL_BY_SLUG, materialSource } from "~/screens/Wiki/entities";
import type { Route } from "./+types/wiki_material";

export function loader({ params }: Route.LoaderArgs) {
  if (!MATERIAL_BY_SLUG[params.slug]) {
    throw data("Material não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params, location }: Route.MetaArgs) {
  const material = MATERIAL_BY_SLUG[params.slug];
  if (!material) return seo({ title: "Wiki", path: location.pathname });
  const uses = material.usedBy.length + material.tools.length;
  return seo({
    title: `${material.name} · Wiki`,
    description: `${materialSource(material)}. ${uses ? `Usado em ${uses} ${uses === 1 ? "receita" : "receitas"}.` : "Ainda não é usado em receitas."}`,
    path: location.pathname,
    image: ogIcon(material.icon),
  });
}

export default function WikiMaterialRoute({ loaderData }: Route.ComponentProps) {
  return <MaterialPage material={MATERIAL_BY_SLUG[loaderData.slug]} />;
}
