import User from "~/screens/User/User";
import type { Route } from "./+types/store";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Rede Cosmo" }, { name: "description", content: "Loja" }];
}

export default function StoreRoute({ params }: Route.ComponentProps) {
  return <User />;
}
