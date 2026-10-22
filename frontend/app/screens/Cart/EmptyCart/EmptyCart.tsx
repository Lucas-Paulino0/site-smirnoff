import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="empty-cart">
      <p className="muted">Seu carrinho está vazio.</p>
      <Link to="/loja" className="btn">
        Voltar para a loja
      </Link>
    </div>
  );
}
