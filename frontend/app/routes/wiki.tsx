import WikiHome from "~/screens/Wiki/WikiHome";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/wiki";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Wiki") },
    {
      name: "description",
      content:
        "Wiki do servidor: primeiros passos, regras, classes, atributos, chefes, comandos e mais.",
    },
  ];
}

export default function WikiRoute() {
  return <WikiHome />;
}
