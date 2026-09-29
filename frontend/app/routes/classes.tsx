import Classes from "~/screens/Classes/Classes";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/classes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Classes") },
    {
      name: "description",
      content:
        "Todas as classes do servidor: linhas Base, Lendárias, Míticas, Secretas e Divinas.",
    },
  ];
}

export default function ClassesRoute() {
  return <Classes />;
}
