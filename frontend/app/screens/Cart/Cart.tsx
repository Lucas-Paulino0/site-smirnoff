import { useCart } from "~/context/CartContext/useCart";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import ProductList from "./ProductList/ProductList";
import DonationInfo from "./DonationInfo/DonationInfo";
import EmptyCart from "./EmptyCart/EmptyCart";
import "../Store/Store.css";

export default function Cart() {
  const { cart, ready } = useCart();

  return (
    <main className="page">
      <SectionHeading as="h1" title="Carrinho" />
      {!ready ? (
        <div className="cart">
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      ) : cart.length > 0 ? (
        <div className="cart">
          <ProductList products={cart} />
          <DonationInfo />
        </div>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
}
