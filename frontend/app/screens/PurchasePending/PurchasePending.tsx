import { Box, Icon, Link, Typography } from "@mui/material";
import Logo from "~/ui/Logo/Logo";

export default function PurchasePending() {
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
      <Icon color="warning" sx={{ fontSize: "80px" }}>
        pending
      </Icon>
      <Typography variant="h4" color="warning">
        Pagamento Pendente
      </Typography>
      <Typography color="warning">
        Seu pagamento está sendo processado. Por favor, aguarde.
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
