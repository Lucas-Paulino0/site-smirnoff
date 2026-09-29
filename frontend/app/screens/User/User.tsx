import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useUser } from "~/context/UserContext/useUser";
import PageContainer from "~/ui/PageContainer/PageContainer";

export default function User() {
  const { username, setUsername } = useUser();

  const handleContinue = () => {
    if (!username) {
      return;
    }

    window.location.href = "carrinho";
  };

  return (
    <PageContainer title="Usuário" video="home_video.mp4" logoClickable>
      <Box
        sx={{
          width: { xs: "90%", sm: "fit-content" },
          margin: "0 auto",
          marginTop: 8,
        }}
      >
        <Card
          sx={{
            padding: 2,
            backgroundColor: "var(--background-primary)",
            border: "1px solid rgb(41, 53, 75)",
          }}
        >
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Typography
              color="primary"
              variant="h5"
              textAlign={"center"}
              sx={{ width: "100%", marginBottom: 2 }}
            >
              Informação
            </Typography>
            <TextField
              focused
              error={!username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: { xs: "100%", sm: 350 } }}
              label="Usuário"
              placeholder="Nick no jogo"
            />
            <Button variant="contained" onClick={handleContinue}>
              Continuar
            </Button>
          </Box>
        </Card>
      </Box>
    </PageContainer>
  );
}
