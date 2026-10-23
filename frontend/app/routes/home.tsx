import Home from "~/screens/Home/Home";
import { seo } from "~/config/seo";
import type { Route } from "./+types/home";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    description:
      "Servidor de Minecraft RPG com 30 classes, 8 atributos, chefes e um mundo medieval para explorar.",
    path: location.pathname,
  });
}

export default function HomeRoute() {
  return <Home />;
}
