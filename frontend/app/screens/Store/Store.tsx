import { useState } from "react";
import { Link } from "react-router";
import type { Category } from "~/domain/Category";
import { useCart } from "~/context/CartContext/useCart";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import ProductList from "./components/ProductList/ProductList";
import CategorySelect from "./components/CategorySelect/CategorySelect";
import "./Store.css";

export default function Store() {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const { cart } = useCart();

  return (
    <main className="page">
      <div className="store__top">
        <SectionHeading
          as="h1"
          title="Loja"
          subtitle="Os itens são entregues direto no jogo, na conta do nick que você informar. O pagamento é feito pelo Mercado Pago."
        />
        <Link to="/loja/carrinho" className="btn btn--ghost">
          Carrinho{cart.length > 0 && ` (${cart.length})`}
        </Link>
      </div>

      <CategorySelect setCategory={setCategory} />
      <ProductList category={category} />
    </main>
  );
}
