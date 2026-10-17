import WorldMap from "~/screens/WorldMap/WorldMap";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/map";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Mapa") },
    {
      name: "description",
      content:
        "Mapa interativo do mundo, bloco por bloco: cidades, níveis de cada região, chefes e locais com monstros.",
    },
  ];
}

export default function MapRoute() {
  return <WorldMap />;
}
