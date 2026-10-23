import Classes from "~/screens/Classes/Classes";
import { seo } from "~/config/seo";
import type { Route } from "./+types/classes";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Classes",
    description:
      "Todas as classes do servidor: linhas Base, Lendárias, Míticas, Secretas e Divinas.",
    path: location.pathname,
  });
}

export default function ClassesRoute() {
  return <Classes />;
}
