import { Typography } from "@mui/material";

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Typography
      textAlign="center"
      color="primary"
      sx={{
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        fontSize: { xs: 42, md: 60 },
        width: "100%",
        backgroundColor: "var(--background-secondary)",
      }}
    >
      {title}
    </Typography>
  );
}
