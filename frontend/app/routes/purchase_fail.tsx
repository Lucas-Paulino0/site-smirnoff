import PurchaseFail from "~/screens/PurchaseFail/PurchaseFail";
import { seo } from "~/config/seo";
import type { Route } from "./+types/purchase_fail";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Pagamento não aprovado",
    path: location.pathname,
    noindex: true,
  });
}

export default function PurchaseFailRoute() {
  return <PurchaseFail />;
}
