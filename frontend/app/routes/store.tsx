import Store from "~/screens/Store/Store";
import { seo } from "~/config/seo";
import type { Route } from "./+types/store";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Loja",
    description:
      "Apoie o servidor na nossa loja.",
    path: location.pathname,
  });
}

export default function StoreRoute() {
  return <Store />;
}
