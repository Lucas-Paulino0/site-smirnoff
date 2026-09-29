import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

export default function SkeletonCard() {
  return (
    <Grid item xs={12} md={6} xl={4}>
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
          <CardMedia
            component="div"
            sx={{
              height: { md: 250, xs: 230 },
              borderBottom: "2px solid var(--background-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </CardMedia>
          <CardContent sx={{ padding: 1 }}>
            <Typography
              color="primary"
              textAlign={"center"}
              sx={{
                fontSize: { xs: 42, md: 28 },
                marginBottom: 3,
              }}
            >
              <Skeleton width="60%" />
            </Typography>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ marginBottom: 1 }}
            />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
}
