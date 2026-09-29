import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: { xs: "425px", md: "75%" },
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
              border: "1px solid rgb(41, 53, 75)",
            }}
          >
            <Box>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: { md: 120, sm: 110, xs: 100 },
                }}
              />
              <CardContent>
                <Box>
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: 28, md: 40 },
                      marginBottom: 1,
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: 24, md: 24 },
                      marginBottom: 2,
                    }}
                  />
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
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={60} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Skeleton variant="text" width={60} />
                      <Skeleton variant="text" width={60} />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#1976d2",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <Skeleton variant="text" width={120} />
            </Box>
          </Card>
        </Box>
      </Box>
    </Grid>
  );
}
