import WikiHome from "~/screens/Wiki/WikiHome";
import { seo } from "~/config/seo";
import type { Route } from "./+types/wiki";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Wiki",
    description:
      "Wiki do servidor: primeiros passos, regras, classes, atributos, chefes, profissões, receitas e mais.",
    path: location.pathname,
  });
}

export default function WikiRoute() {
  return <WikiHome />;
}
