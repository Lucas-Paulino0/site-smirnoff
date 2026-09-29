import PurchaseFail from "~/screens/PurchaseFail/PurchaseFail";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/purchase_fail";

export function meta({}: Route.MetaArgs) {
  return [{ title: pageTitle("Pagamento não aprovado") }];
}

export default function PurchaseFailRoute() {
  return <PurchaseFail />;
}
