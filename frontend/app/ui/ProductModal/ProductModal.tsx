import { Modal } from "@mui/material";
import type { Product } from "~/domain/Product";
import { formatPrice } from "~/services/api";

type ProductModalProps = {
  product: Product | undefined;
  open: boolean;
  action?: () => void;
  onClose: () => void;
};

export default function ProductModal({
  product,
  open,
  action,
  onClose,
}: ProductModalProps) {
  const items = product?.items.split("|").filter((item) => item !== "") ?? [];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="product-modal-title">
      <div className="panel product-modal">
        {product && (
          <>
            <h2 id="product-modal-title" className="title">
              {product.name}
            </h2>
            <p className="product-modal__description">{product.description}</p>
            {items.length > 0 && (
              <>
                <strong>Você recebe</strong>
                <ul className="product-modal__items">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="product-modal__actions">
              {action && product.enabled && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    action();
                    onClose();
                  }}
                >
                  Adicionar ao carrinho ({formatPrice(product.price)})
                </button>
              )}
              <button
                type="button"
                className="btn btn--ghost"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
