import { Box, Link, Typography } from "@mui/material";

export default function EmptyCart({ serverName }: { serverName: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "90px",
        textAlign: "center",
        width: "100%",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderColor: "var(--mui-palette-primary-main)",
        marginTop: "40px",
      }}
    >
      <Typography variant="h4" color="primary">
        Carrinho Vazio
      </Typography>
      <Link href={`/${serverName}`} color="primary" underline="none">
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
