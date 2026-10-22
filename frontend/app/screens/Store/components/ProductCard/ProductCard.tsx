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
      showError("Esse produto já está no carrinho.");
      return;
    }
    if (!product.enabled) {
      showError("Esse produto ainda não está à venda.");
      return;
    }
    addToCart(product);
    showSuccess(`${product.name} foi para o carrinho.`);
  };

  return (
    <>
      <article className="product">
        <button
          type="button"
          className="product__image"
          onClick={() => setShowDetails(true)}
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <img src={fileUrl(product.image)} alt="" loading="lazy" />
        </button>
        <div className="product__body">
          <h3 className="product__name">{product.name}</h3>
          <p
            className={`product__price${product.enabled ? "" : " product__price--soon"}`}
          >
            {product.enabled ? formatPrice(product.price) : "Em breve"}
          </p>
          <div className="product__actions">
            {product.enabled && (
              <button type="button" className="btn btn--small" onClick={handleAdd}>
                Adicionar
              </button>
            )}
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setShowDetails(true)}
            >
              Detalhes
            </button>
          </div>
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
