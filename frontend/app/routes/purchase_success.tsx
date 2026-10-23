import PurchaseSuccess from "~/screens/PurchaseSuccess/PurchaseSuccess";
import { seo } from "~/config/seo";
import type { Route } from "./+types/purchase_success";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Pagamento aprovado",
    path: location.pathname,
    noindex: true,
  });
}

export default function PurchaseSuccessRoute() {
  return <PurchaseSuccess />;
}
