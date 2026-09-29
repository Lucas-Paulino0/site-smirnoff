import { Box } from "@mui/material";
import { useCart } from "~/context/CartContext/useCart";
import type { Server } from "~/domain/Server";
import PageContainer from "~/ui/PageContainer/PageContainer";
import ProductList from "./ProductList/ProductList";
import DonationInfo from "./DonationInfo/DonationInfo";
import DonationInfoSkeleton from "./DonationInfo/Skeleton/DonationInfoSkeleton";
import ProductListSkeleton from "./ProductList/Skeleton/ProductListSkeleton";
import { useEffect } from "react";
import EmptyCart from "./EmptyCart/EmptyCart";

type CartProps = {
  server: Server | undefined;
};

export default function Cart({ server }: CartProps) {
  const { cart } = useCart();
  return (
    <PageContainer
      title={server?.name}
      video={server?.video || "home_video.mp4"}
      logoClickable
    >
      <Box
        sx={{
          padding: { xs: "20px", lg: "20px 10%", xl: "20px 15%" },
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: "20px",
        }}
      >
        {server ? (
          cart.length > 0 ? (
            <>
              <ProductList products={cart} serverName={server?.name} />
              <DonationInfo />
            </>
          ) : (
            <EmptyCart serverName={server?.internalName} />
          )
        ) : (
          <>
            <ProductListSkeleton />
            <DonationInfoSkeleton />
          </>
        )}
      </Box>
    </PageContainer>
  );
}
