import Store from "~/screens/Store/Store";
import type { Route } from "./+types/store";
import { CartProvider } from "~/context/CartContext/CartProvider";
import { useEffect, useState } from "react";
import type { Server } from "~/domain/Server";
import { getServer } from "~/services/serverServices";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Smirnoff" }, { name: "description", content: "Loja" }];
}

export default function StoreRoute({ params }: Route.ComponentProps) {
  const { serverName } = params;
  const navigate = useNavigate();

  const [server, SetServer] = useState<Server>();

  useEffect(() => {
    if (!serverName) {
      navigate("/");
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

  if (!serverName) {
    return <></>;
  }

  return (
    <CartProvider server={server}>
      <Store server={server} />
    </CartProvider>
  );
}
