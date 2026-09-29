import Home from "~/screens/Home/Home";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle() },
    {
      name: "description",
      content:
        "Servidor de Minecraft RPG com 30 classes, nível até 100, chefes e um mundo medieval para explorar.",
    },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
