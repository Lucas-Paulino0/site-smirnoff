import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import type { Server } from "~/domain/Server";

type ServerCardProps = {
  server: Server;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function ServerCard({
  server,
  onMouseEnter,
  onMouseLeave,
}: ServerCardProps) {
  const { showSuccess } = useAlert();

  return (
    <Grid item xs={12} md={6} lg={4} key={server.id}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingBottom: "425px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: { xs: 420 },
              borderRadius: "10px",
              backgroundColor: "transparent",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
              border: "1px solid rgb(41, 53, 75)",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Box>
              <CardMedia
                component="img"
                sx={{
                  height: { md: 120, sm: 110, xs: 100 },
                }}
                image={`${process.env.PUBLIC_API_URL}/files/${server.image}`}
              />
              <CardContent>
                <Box>
                  <Typography
                    color="primary"
                    textAlign={"center"}
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: 28, md: 40 },
                    }}
                  >
                    {server.name}
                  </Typography>
                  <Tooltip
                    arrow
                    title={
                      <React.Fragment>
                        <Typography color="secondary">
                          Clique para copiar
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <Typography
                      component="div"
                      color="primary"
                      textAlign={"center"}
                      fontWeight={600}
                      sx={{
                        cursor: "pointer",
                        fontSize: { xs: 24, md: 24 },
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(server.ip);
                        showSuccess("IP copiado para a área de transferência");
                      }}
                    >
                      {server.ip}
                    </Typography>
                  </Tooltip>
                  <Box>
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        color="secondary"
                        textAlign={"center"}
                        fontSize={22}
                      >
                        Status:
                      </Typography>
                      {server.status === "Online" ? (
                        <Typography
                          color="success"
                          textAlign={"center"}
                          fontSize={22}
                        >
                          Online
                        </Typography>
                      ) : (
                        <Typography
                          color="error"
                          textAlign={"center"}
                          fontSize={22}
                        >
                          Offline
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        color="secondary"
                        textAlign={"center"}
                        fontSize={22}
                      >
                        Jogadores:
                      </Typography>
                      <Typography
                        color="secondary"
                        textAlign={"center"}
                        fontSize={22}
                      >
                        {server.players} / {server.maxPlayers}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <Link
              href={`/${server.internalName}`}
              underline="none"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#1976d2",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                color="#fff"
                textAlign={"center"}
                fontWeight={700}
              >
                Visitar a loja
              </Typography>
            </Link>
          </Card>
        </Box>
      </Box>
    </Grid>
  );
}
