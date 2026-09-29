import {
  useState,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import type { Product } from "~/domain/Product";
import type { Server } from "~/domain/Server";

type CartContext = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

export const CartContext = createContext({} as CartContext);

type CartProviderProps = {
  children: React.ReactNode;
  server: Server | undefined;
};

export const CartProvider = ({ children, server }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (!server) return;
    const cartCookie = Cookies.get(`cart-${server.internalName}`);
    setCart(cartCookie ? JSON.parse(cartCookie) : []);
  }, [server]);

  useEffect(() => {
    if (!server) return;
    Cookies.set(`cart-${server.internalName}`, JSON.stringify(cart));
  }, [cart, server]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const removeFromCart = useCallback((product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
