import WorldMap from "~/screens/WorldMap/WorldMap";
import { seo } from "~/config/seo";
import type { Route } from "./+types/map";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Mapa",
    description:
      "Mapa interativo do mundo, bloco por bloco: cidades, níveis de cada região, chefes e locais com monstros.",
    path: location.pathname,
  });
}

export default function MapRoute() {
  return <WorldMap />;
}
