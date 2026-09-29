import Cart from "~/screens/Cart/Cart";
import { pageTitle } from "~/config/site";
import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [{ title: pageTitle("Carrinho") }];
}

export default function CartRoute() {
  return <Cart />;
}
