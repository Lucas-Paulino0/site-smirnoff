import Cart from "~/screens/Cart/Cart";
import { seo } from "~/config/seo";
import type { Route } from "./+types/cart";

export function meta({ location }: Route.MetaArgs) {
  return seo({
    title: "Carrinho",
    path: location.pathname,
    noindex: true,
  });
}

export default function CartRoute() {
  return <Cart />;
}
