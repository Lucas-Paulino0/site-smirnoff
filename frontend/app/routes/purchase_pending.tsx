import PurchasePending from "~/screens/PurchasePending/PurchasePending";
import { seo } from "~/config/seo";
import type { Route } from "./+types/purchase_pending";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Pagamento pendente",
    path: location.pathname,
    noindex: true,
  });
}

export default function PurchasePendingRoute() {
  return <PurchasePending />;
}
