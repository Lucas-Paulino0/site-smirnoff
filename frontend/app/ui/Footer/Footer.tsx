import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        bottom: 0,
        backgroundColor: "var(--background-secondary)",
        paddingBlock: 14,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          paddingInline: "15%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography color="secondary" textAlign="center" sx={{ flexGrow: 1 }}>
          © {new Date().getFullYear()} - Rede Cosmo - Todos os direitos
          reservados
        </Typography>
        <Link href={`/termos`} color="secondary" underline="none">
          <Typography
            color="secondary"
            sx={{
              transition: "color 0.2s",
              "&:hover": {
                color: "#1976d2",
              },
            }}
          >
            Termos de uso
          </Typography>
        </Link>
      </Box>
    </footer>
  );
}
