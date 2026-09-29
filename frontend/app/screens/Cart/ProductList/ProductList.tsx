import { Icon } from "@mui/material";
import { useState } from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useCart } from "~/context/CartContext/useCart";
import type { Product } from "~/domain/Product";
import { fileUrl, formatPrice } from "~/services/api";
import ProductModal from "~/ui/ProductModal/ProductModal";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const { removeFromCart } = useCart();
  const { showSuccess } = useAlert();

  const [productDisplay, setProductDisplay] = useState<Product | undefined>(
    undefined
  );

  return (
    <section className="frame">
      <p className="cart__notice">
        Os produtos são ativados em até 1 hora depois da confirmação do
        pagamento, na conta do nick informado.
      </p>
      <ul className="cart__items">
        {products.map((product) => (
          <li key={product.id} className="cart__item">
            <img src={fileUrl(product.image)} alt="" />
            <span className="cart__item-name">{product.name}</span>
            <span className="cart__item-price">
              {formatPrice(product.price)}
            </span>
            <div className="cart__item-actions">
              <button
                type="button"
                className="icon-btn"
                aria-label={`Ver detalhes de ${product.name}`}
                onClick={() => setProductDisplay(product)}
              >
                <Icon fontSize="small">visibility</Icon>
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                aria-label={`Remover ${product.name} do carrinho`}
                onClick={() => {
                  removeFromCart(product);
                  showSuccess("Produto removido do carrinho");
                }}
              >
                <Icon fontSize="small">delete</Icon>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ProductModal
        open={!!productDisplay}
        product={productDisplay}
        onClose={() => setProductDisplay(undefined)}
      />
    </section>
  );
}
