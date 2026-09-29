import {
  Alert,
  Box,
  Button,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useCart } from "~/context/CartContext/useCart";
import type { Product } from "~/domain/Product";
import ProductModal from "~/ui/ProductModal/ProductModal";

type ProductListProps = {
  products: Product[];
  serverName: string | undefined;
};

export default function ProductList({
  products,
  serverName,
}: ProductListProps) {
  const { removeFromCart } = useCart();
  const { showSuccess } = useAlert();

  const [productDisplay, setProductDisplay] = useState<Product | undefined>(
    undefined
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: { xs: "fit-content", lg: "600px" },
        backgroundColor: "var(--background-secondary)",
        border: "1px solid rgb(41, 53, 75)",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Alert severity="info">
        A ativação do produto será feita em até 1 hora após a confirmação do
        pagamento.
      </Alert>
      <TableContainer>
        <Table sx={{ marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Produto</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Preço</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Servidor</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Duração</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  R$ {product.price.toFixed(2)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {serverName || ""}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>-</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "var(--button-background-primary)",
                        padding: "5px",
                        minWidth: 0,
                        borderRadius: 2,
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
                      <Icon color="secondary">visibility</Icon>
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "var(--button-background-primary)",
                        padding: "5px",
                        minWidth: 0,
                        borderRadius: 2,
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.01)",
                        },
                        "&:disabled": {
                          backgroundColor: "var(--button-background-disabled)",
                        },
                      }}
                      onClick={() => {
                        removeFromCart(product);
                        showSuccess("Produto removido do carrinho");
                      }}
                    >
                      <Icon color="secondary">delete</Icon>
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductModal
        open={!!productDisplay}
        product={productDisplay}
        onClose={() => setProductDisplay(undefined)}
      />
    </Box>
  );
}
