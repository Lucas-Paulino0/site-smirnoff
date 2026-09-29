import { Badge, Box, Button, Icon, Link, Typography } from "@mui/material";
import { useCart } from "~/context/CartContext/useCart";
import type { Server } from "~/domain/Server";

type CartButtonProps = {
  server: Server;
};

export default function CartButton({ server }: CartButtonProps) {
  const { cart } = useCart();
  return (
    <Button sx={{ padding: 0 }}>
      <Link
        href={`/${server.internalName}/carrinho`}
        underline="none"
        sx={{ display: "flex", gap: 1, padding: 1 }}
      >
        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}
        >
          <Icon>shopping_cart</Icon>
        </Badge>
        <Typography>Ir para o Carrinho</Typography>
      </Link>
    </Button>
  );
}
