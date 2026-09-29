import {
  Box,
  Button,
  Checkbox,
  Divider,
  Icon,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";

export default function DonationInfoSkeleton() {
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
        <Typography variant="h5" color="primary" textAlign="center">
          <Skeleton />
        </Typography>
        <Divider
          sx={{
            marginTop: 1,
            backgroundColor: "var(--mui-palette-primary-main)",
            marginBottom: 4,
          }}
        />
        <Typography sx={{ fontSize: 18 }} color="primary">
          <Skeleton />
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="primary">
          <Skeleton />
        </Typography>
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{
            padding: 1,
            marginBottom: 2,
            borderRadius: 2,
          }}
        />
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
            <Skeleton width={100} />
          </Typography>
        </Box>
        <Skeleton variant="rectangular" width={"100%"} height={280} />
      </Box>
    </Box>
  );
}
