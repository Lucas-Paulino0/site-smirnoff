import { Box, Icon, Link, Typography } from "@mui/material";
import Logo from "~/ui/Logo/Logo";

export default function PurchaseFail() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "90px",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <Logo />
      <Icon color="error" sx={{ fontSize: "80px" }}>
        error
      </Icon>
      <Typography variant="h4" color="error">
        Erro no Pagamento
      </Typography>
      <Typography color="error">
        Seu pagamento não foi aprovado. Por favor, tente novamente.
      </Typography>
      <Link href="/" color="primary" underline="none">
        <Typography
          sx={{
            color: "var(--mui-palette-primary-main)",
            transition: "color 0.3s",
            "&:hover": {
              color: "var(--mui-palette-secondary-main)",
            },
          }}
        >
          Voltar
        </Typography>
      </Link>
    </Box>
  );
}
