import { Box, Icon, Link, Typography } from "@mui/material";
import Logo from "~/ui/Logo/Logo";

export default function PurchaseSuccess() {
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
      <Icon color="success" sx={{ fontSize: "80px" }}>
        check_circle
      </Icon>
      <Typography variant="h4" color="success">
        Pagamento Aprovado
      </Typography>
      <Typography color="success">
        Seu pedido foi aprovado e será processado em breve.
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
