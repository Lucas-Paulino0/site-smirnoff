import User from "~/screens/User/User";
import { seo } from "~/config/seo";
import type { Route } from "./+types/user";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Seu nick",
    path: location.pathname,
    noindex: true,
  });
}

export default function UserRoute() {
  return <User />;
}
