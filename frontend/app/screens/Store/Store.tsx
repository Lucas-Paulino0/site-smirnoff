import { Box } from "@mui/material";
import { useState } from "react";
import type { Server } from "~/domain/Server";
import type { Category } from "~/domain/Category";
import ProductList from "./components/ProductList/ProductList";
import CategorySelect from "./components/CategorySelect/CategorySelect";
import CartButton from "./components/CartButton/CartButton";
import PageContainer from "~/ui/PageContainer/PageContainer";

type StoreProps = {
  server: Server | undefined;
};

export default function Store({ server }: StoreProps) {
  const [category, setCategory] = useState<Category | undefined>(undefined);

  return (
    <PageContainer
      title={server?.name}
      video={server?.video || "home_video.mp4"}
      logoClickable
    >
      {server && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CartButton server={server} />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexDirection: { xs: "column", md: "row" },
          padding: {
            xs: 2,
            sm: "50px 15%",
            md: 4,
            lg: "50px 15%",
          },
        }}
      >
        <CategorySelect setCategory={setCategory} />
        <ProductList server={server} category={category} />
      </Box>
    </PageContainer>
  );
}
