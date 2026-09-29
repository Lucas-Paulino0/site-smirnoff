import PurchasePending from "~/screens/PurchasePending/PurchasePending";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/purchase_pending";

export function meta({}: Route.MetaArgs) {
  return [{ title: pageTitle("Pagamento pendente") }];
}

export default function PurchasePendingRoute() {
  return <PurchasePending />;
}
