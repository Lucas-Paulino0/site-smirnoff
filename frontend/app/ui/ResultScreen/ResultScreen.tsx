import { Icon } from "@mui/material";
import { Link } from "react-router";

type ResultScreenProps = {
  icon: string;
  color: string;
  title: string;
  message: string;
};

// Tela de retorno do Mercado Pago (sucesso, erro ou pendente)
export default function ResultScreen({
  icon,
  color,
  title,
  message,
}: ResultScreenProps) {
  return (
    <main className="page" style={{ maxWidth: 560 }}>
      <div
        className="frame"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
          padding: "40px 24px",
        }}
      >
        <Icon sx={{ fontSize: 80, color }}>{icon}</Icon>
        <h1 className="title" style={{ color }}>
          {title}
        </h1>
        <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
          {message}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <Link to="/" className="btn">
            Página inicial
          </Link>
          <Link to="/loja" className="btn btn--wood">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </main>
  );
}
