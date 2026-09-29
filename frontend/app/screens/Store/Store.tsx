import { Badge, Icon } from "@mui/material";
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
      <SectionHeading
        as="h1"
        title="Loja"
        subtitle="Apoie o servidor e receba seus itens direto no jogo. O pagamento é feito pelo Mercado Pago."
      />

      <div className="store__toolbar">
        <Link to="/loja/carrinho" className="btn btn--wood">
          <Badge
            badgeContent={cart.length}
            color="primary"
            invisible={cart.length === 0}
          >
            <Icon>shopping_cart</Icon>
          </Badge>
          Ir para o carrinho
        </Link>
      </div>

      <div className="store">
        <CategorySelect setCategory={setCategory} />
        <ProductList category={category} />
      </div>
    </main>
  );
}
