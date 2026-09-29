import { useState } from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useCart } from "~/context/CartContext/useCart";
import type { Product } from "~/domain/Product";
import { fileUrl, formatPrice } from "~/services/api";
import ProductModal from "~/ui/ProductModal/ProductModal";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const { showSuccess, showError } = useAlert();

  const handleAdd = () => {
    if (cart.find((item) => item.id === product.id)) {
      showError("Esse produto já está no carrinho!");
      return;
    }
    if (!product.enabled) {
      showError("Esse produto ainda não está à venda.");
      return;
    }
    addToCart(product);
    showSuccess("Produto adicionado ao carrinho!");
  };

  return (
    <>
      <article className="frame product">
        <div className="product__image">
          <img src={fileUrl(product.image)} alt="" loading="lazy" />
          <span className="product__price">
            {product.enabled ? formatPrice(product.price) : "Em breve"}
          </span>
        </div>
        <div className="product__body">
          <h3 className="title product__name">{product.name}</h3>
          <button
            type="button"
            className="btn btn--block"
            disabled={!product.enabled}
            onClick={handleAdd}
          >
            {product.enabled ? "Comprar" : "Em breve"}
          </button>
          <button
            type="button"
            className="btn btn--wood btn--block btn--small"
            onClick={() => setShowDetails(true)}
          >
            Detalhes
          </button>
        </div>
      </article>
      <ProductModal
        open={showDetails}
        product={product}
        action={handleAdd}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
