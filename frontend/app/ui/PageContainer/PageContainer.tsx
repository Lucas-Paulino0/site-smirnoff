import { Box, Skeleton, Typography } from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";
import VideoBackground from "../VideoBackground/VideoBackground";
import Logo from "../Logo/Logo";
import Footer from "../Footer/Footer";

type PageContainerProps = {
  children: React.ReactNode;
  title: string | undefined;
  video: string;
  logoClickable?: boolean;
};

export default function PageContainer({
  children,
  title,
  video,
  logoClickable,
}: PageContainerProps) {
  return (
    <VideoBackground src={video}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <Logo clickable={logoClickable} />
        </Box>
        <Box
          sx={{
            marginTop: 55,
            marginBottom: 10,
            borderRadius: 15,
            backgroundColor: "var(--background-primary)",
            boxSizing: "border-box",
            width: "100%",
            minHeight: 500,
          }}
        >
          {title ? (
            <PageTitle title={title} />
          ) : (
            <Typography
              textAlign="center"
              color="primary"
              sx={{
                borderTopLeftRadius: 45,
                borderTopRightRadius: 45,
                fontSize: 60,
                width: "100%",
                backgroundColor: "var(--background-secondary)",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  width: "30%",
                  margin: "0 auto",
                  borderRadius: 2,
                  backgroundColor: "var(--background-primary)",
                }}
              />
            </Typography>
          )}
          {children}
        </Box>
        <Footer />
      </Box>
    </VideoBackground>
  );
}
