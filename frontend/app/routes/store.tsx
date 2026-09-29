import Store from "~/screens/Store/Store";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: pageTitle("Loja") },
    { name: "description", content: "Apoie o servidor na nossa loja." },
  ];
}

export default function StoreRoute() {
  return <Store />;
}
