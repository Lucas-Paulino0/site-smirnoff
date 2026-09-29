import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import type { Product } from "~/domain/Product";
import ProductModal from "../../../../ui/ProductModal/ProductModal";
import { useCart } from "~/context/CartContext/useCart";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart } = useCart();

  const [productDisplay, setProductDisplay] = useState<Product | undefined>(
    undefined
  );
  const { showSuccess, showError } = useAlert();

  const handleAdd = () => {
    if (cart && cart.find((item) => item.id === product.id)) {
      showError("Produto já está no carrinho!");
      return;
    }
    if (!product.enabled) {
      showError("Produto indisponível!");
      return;
    }
    addToCart(product);
    showSuccess("Produto adicionado ao carrinho!");
  };

  return (
    <>
      <Grid item xs={12} md={6} xl={4}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "fit-content",
            borderRadius: "10px",
            backgroundColor: "transparent",
            border: "1px solid rgb(41, 53, 75)",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "var(--background-secondary)",
                top: 0,
                right: 0,
                paddingInline: 1,
                borderBottomLeftRadius: 1,
              }}
            >
              <Typography
                color="primary"
                textAlign={"center"}
                sx={{
                  fontSize: { xs: 22, md: 18 },
                }}
              >
                R$ {product.price.toFixed(2)}
              </Typography>
            </Box>
            <CardMedia
              component="img"
              sx={{
                height: { md: 250, xs: 230 },
                borderBottom: "2px solid var(--background-secondary)",
                objectFit: "contain",
              }}
              image={`${process.env.PUBLIC_API_URL}/files/${product.image}`}
            />
            <CardContent sx={{ padding: 1 }}>
              <Typography
                color="primary"
                textAlign={"center"}
                sx={{
                  fontSize: { xs: 22, md: 22 },
                  marginBottom: 3,
                }}
              >
                {product.name}
              </Typography>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "var(--button-background-primary)",
                  marginBottom: 1,
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                  "&:disabled": {
                    backgroundColor: "var(--button-background-disabled)",
                  },
                }}
                disabled={!product.enabled}
                onClick={handleAdd}
              >
                <Typography color="secondary">
                  {product.enabled ? "Comprar" : "Indisponível"}
                </Typography>
              </Button>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "var(--button-background-secondary)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                  "&:disabled": {
                    backgroundColor: "var(--button-background-disabled)",
                  },
                }}
                onClick={() => setProductDisplay(product)}
              >
                <Typography color="primary">Informações</Typography>
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <ProductModal
        open={!!productDisplay}
        product={productDisplay}
        action={handleAdd}
        onClose={() => setProductDisplay(undefined)}
      />
    </>
  );
}
