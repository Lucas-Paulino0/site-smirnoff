import {
  useState,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react";
import type { Product } from "~/domain/Product";

type CartContext = {
  cart: Product[];
  ready: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

export const CartContext = createContext({} as CartContext);

const STORAGE_KEY = "hail-cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  // O carrinho só existe no navegador: carrega depois de montar para não
  // divergir do HTML gerado no servidor.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {
      // armazenamento indisponível (aba anônima, bloqueado): carrinho vazio
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignora: o carrinho continua funcionando enquanto a aba estiver aberta
    }
  }, [cart, ready]);

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
      ready,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cart, ready, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
