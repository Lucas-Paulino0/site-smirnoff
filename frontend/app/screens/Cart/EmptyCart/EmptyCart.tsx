import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="frame empty-cart">
      <h2 className="title">Seu carrinho está vazio</h2>
      <p className="muted">Dê uma olhada na loja e escolha algo para levar.</p>
      <Link to="/loja" className="btn">
        Voltar para a loja
      </Link>
    </div>
  );
}
