import Home from "~/screens/Home/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smirnoff" },
    { name: "description", content: "Pagina Inicial" },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
