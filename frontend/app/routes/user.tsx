import User from "~/screens/User/User";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/user";

export function meta({}: Route.MetaArgs) {
  return [{ title: pageTitle("Seu nick") }];
}

export default function UserRoute() {
  return <User />;
}
