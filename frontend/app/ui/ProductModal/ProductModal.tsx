import { Box, Button, List, ListItem, Modal, Typography } from "@mui/material";
import type { Product } from "~/domain/Product";

type ProductCardProps = {
  product: Product | undefined;
  open: boolean;
  action?: () => void;
  onClose: () => void;
};

export default function ProductModal({
  product,
  open,
  action,
  onClose,
}: ProductCardProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          borderRadius: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: 600 },
          height: "fit-content",
          background: "var(--background-primary)",
        }}
      >
        {product && (
          <>
            <Box
              sx={{
                padding: 2,
                borderBottom: "2px solid var(--background-secondary)",
              }}
            >
              <Typography
                color="primary"
                variant="h3"
                textAlign={"center"}
                sx={{ fontSize: { xs: 32, md: 46 } }}
              >
                {product.name}
              </Typography>
            </Box>
            <Box sx={{ padding: 2 }}>
              <Typography color="primary">{product.description}</Typography>
            </Box>
            <Box
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                paddingRight: 1,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "var(--scrollbar-thumb)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "var(--scrollbar-track)",
                },
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)", // For Firefox
              }}
            >
              <List>
                {product.items.split("|").map(
                  (item) =>
                    item !== "" && (
                      <ListItem key={item}>
                        <Typography color="primary">- {item}</Typography>
                      </ListItem>
                    )
                )}
              </List>
            </Box>
            <Box sx={{ padding: 2, marginTop: 2 }}>
              {action && (
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
                  onClick={action}
                >
                  <Typography color="secondary">
                    {product.enabled ? "Comprar" : "Indisponível"}
                  </Typography>
                </Button>
              )}
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
                onClick={onClose}
              >
                <Typography color="primary">Fechar</Typography>
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
