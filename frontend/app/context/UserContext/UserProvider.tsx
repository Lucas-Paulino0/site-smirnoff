import { useState, useMemo, createContext, useEffect } from "react";
import Cookies from "js-cookie";

type UserContext = {
  username: string | null;
  ready: boolean;
  setUsername: (username: string) => void;
};

export const UserContext = createContext({} as UserContext);

// Mesmo formato aceito pelo backend
export const MINECRAFT_USERNAME = /^[A-Za-z0-9_]{3,16}$/;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUsername(Cookies.get("username") || null);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Secure: no site publicado (https) o cookie nunca trafega sem criptografia
    Cookies.set("username", username || "", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
  }, [username, ready]);

  const value = useMemo(
    () => ({
      username,
      ready,
      setUsername,
    }),
    [username, ready]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
