import { Checkbox, CircularProgress, Icon } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useCart } from "~/context/CartContext/useCart";
import { useUser } from "~/context/UserContext/useUser";
import { formatPrice } from "~/services/api";
import { createPurchase } from "~/services/purchaseService";

export default function DonationInfo() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const { username } = useUser();
  const { showError } = useAlert();
  const navigate = useNavigate();

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  const handleRedirect = async () => {
    if (!username) {
      navigate("/loja/usuario");
      return;
    }
    if (cart.length === 0) {
      showError("Carrinho vazio");
      return;
    }

    setLoading(true);
    const initPoint = await createPurchase(
      username,
      cart.map((product) => product.id)
    );

    if (!initPoint) {
      showError("Não foi possível iniciar o pagamento. Tente novamente.");
      setLoading(false);
      return;
    }

    clearCart();
    window.location.href = initPoint;
  };

  return (
    <aside className="parchment summary">
      <h2 className="title">Resumo</h2>

      <div className="summary__total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <label className="summary__terms">
        <Checkbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          sx={{ color: "var(--ink)", "&.Mui-checked": { color: "var(--crimson)" } }}
        />
        <span>
          Li e aceito os <Link to="/termos">termos de uso</Link>
        </span>
      </label>

      {loading ? (
        <CircularProgress size={32} sx={{ alignSelf: "center", color: "var(--ink)" }} />
      ) : (
        <button
          type="button"
          className="btn btn--block"
          disabled={!termsAccepted}
          onClick={handleRedirect}
        >
          {username ? "Ir para o pagamento" : "Informar meu nick"}
        </button>
      )}

      {username && (
        <div className="summary__player">
          <span>Os itens vão para:</span>
          <span className="summary__player-name">
            {username}
            <Link
              to="/loja/usuario"
              className="icon-btn"
              aria-label="Trocar de nick"
              title="Trocar de nick"
            >
              <Icon fontSize="small">edit</Icon>
            </Link>
          </span>
          <img
            src={`https://mc-heads.net/body/${encodeURIComponent(username)}/120`}
            alt={`Skin de ${username}`}
            height={180}
          />
        </div>
      )}
    </aside>
  );
}
