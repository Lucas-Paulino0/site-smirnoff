import WorldMap from "~/screens/WorldMap/WorldMap";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/map";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Mapa") },
    { name: "description", content: "O mapa do mundo e suas regiões." },
  ];
}

export default function MapRoute() {
  return <WorldMap />;
}
