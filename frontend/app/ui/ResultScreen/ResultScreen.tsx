import { Link } from "react-router";

type ResultScreenProps = {
  tone: "success" | "pending" | "error";
  title: string;
  message: string;
};

// Tela de retorno do Mercado Pago (sucesso, erro ou pendente)
export default function ResultScreen({ tone, title, message }: ResultScreenProps) {
  return (
    <main className="page">
      <div className={`panel result result--${tone}`}>
        <h1 className="title">{title}</h1>
        <p className="muted">{message}</p>
        <div className="result__actions">
          <Link to="/loja" className="btn">
            Voltar para a loja
          </Link>
          <Link to="/" className="btn btn--ghost">
            Página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
