import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Icon,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useCart } from "~/context/CartContext/useCart";
import { useUser } from "~/context/UserContext/useUser";
import { createPurchase } from "~/services/purchaseService";

export default function DonationInfo() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { cart, clearCart } = useCart();
  const { username, setUsername } = useUser();

  const [loading, setLoading] = useState(false);

  const { showError } = useAlert();

  const handleRedirect = async () => {
    if (!username) {
      showError("Usuário inválido");
      return;
    }
    if (!cart || cart.length === 0) {
      showError("Carrinho vazio");
      return;
    }

    setLoading(true);
    const initPoint = await createPurchase(
      username,
      cart.map((product) => product.id)
    );

    if (!initPoint) {
      showError("Erro Interno");
      setLoading(false);
      return;
    }

    window.location.href = initPoint;
    clearCart();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: { xs: 1, lg: 0 },
        width: { xs: "unset", lg: "290px" },
        minHeight: "600px",
        backgroundColor: "var(--background-secondary)",
        border: "1px solid rgb(41, 53, 75)",
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5" color="primary">
          Dados da Doação
        </Typography>
        <Divider
          sx={{
            marginTop: 1,
            backgroundColor: "var(--mui-palette-primary-main)",
            marginBottom: 4,
          }}
        />
        <Typography sx={{ fontSize: 18 }} color="primary">
          <strong>Sub-Total:</strong> R${" "}
          {cart.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="primary">
          <strong>Total:</strong> R${" "}
          {cart.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            color="primary"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <Typography sx={{ fontSize: 16 }} color="primary">
            Li os{" "}
            <Link href="/termos" color="secondary">
              Termos
            </Link>
          </Typography>
        </Box>
        {loading ? (
          <CircularProgress
            size={24}
            sx={{
              padding: 1,
              marginBottom: 2,
            }}
          />
        ) : (
          <Button
            sx={{
              backgroundColor: "var(--button-background-primary)",
              padding: 1,
              marginBottom: 2,
              borderRadius: 2,
              width: "100%",
              border: "1px solid rgb(41, 53, 75)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
              "&:disabled": {
                backgroundColor: "var(--button-background-disabled)",
              },
            }}
            disabled={!termsAccepted}
            onClick={handleRedirect}
          >
            <Typography color="secondary">Doar</Typography>
          </Button>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "var(--background-primary)",
          padding: 2,
          borderRadius: 2,
          border: "1px solid rgb(41, 53, 75)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            color="primary"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              backgroundColor: "var(--background-secondary)",
              border: "1px solid rgb(41, 53, 75)",
              width: "fit-content",
              padding: "2px 15px",
              borderRadius: 2,
            }}
          >
            {username}
          </Typography>
          <Button
            sx={{
              backgroundColor: "var(--button-background-secondary)",
              padding: "5px",
              minWidth: 0,
              borderRadius: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
              "&:disabled": {
                backgroundColor: "var(--button-background-disabled)",
              },
            }}
            onClick={() => {
              setUsername("");
              window.location.href = "usuario";
            }}
          >
            <Icon color="primary">cached</Icon>
          </Button>
        </Box>
        <img src={`https://mc-heads.net/player/${username}/128.png`} />
      </Box>
    </Box>
  );
}
