import { useUser } from "~/context/UserContext/useUser";
import type { Route } from "./+types/store";
import Cart from "~/screens/Cart/Cart";
import { useEffect, useState } from "react";
import type { Server } from "~/domain/Server";
import { getServer } from "~/services/serverServices";
import { CartProvider } from "~/context/CartContext/CartProvider";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Smirnoff" }, { name: "description", content: "Loja" }];
}

export default function StoreRoute({ params }: Route.ComponentProps) {
  const { serverName } = params;
  const navigate = useNavigate();
  const { username } = useUser();

  const [server, SetServer] = useState<Server>();

  useEffect(() => {
    if (!serverName) {
      navigate("/");
      return;
    }
    if (!username || username === "") {
      navigate(`/${serverName}/usuario`);
      return;
    }
    const fetchServer = async () => {
      const fetchedServer: Server | undefined = await getServer(serverName);
      if (!fetchedServer) {
        navigate("/");
        return;
      }
      SetServer(fetchedServer);
    };

    fetchServer();
  }, []);

  if (!username) {
    return <></>;
  }

  if (!serverName) {
    return <></>;
  }

  return (
    <CartProvider server={server}>
      <Cart server={server} />
    </CartProvider>
  );
}
