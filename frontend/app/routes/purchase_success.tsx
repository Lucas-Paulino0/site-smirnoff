import PurchaseSuccess from "~/screens/PurchaseSuccess/PurchaseSuccess";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/purchase_success";

export function meta({}: Route.MetaArgs) {
  return [{ title: pageTitle("Pagamento aprovado") }];
}

export default function PurchaseSuccessRoute() {
  return <PurchaseSuccess />;
}
