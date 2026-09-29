import { useState, useMemo, createContext, useEffect } from "react";
import Cookies from "js-cookie";

type UserContext = {
  username: string | null;
  setUsername: (username: string) => void;
};

export const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(
    Cookies.get("username") || null
  );

  useEffect(() => {
    Cookies.set("username", username || "");
  }, [username]);

  const value = useMemo(
    () => ({
      username,
      setUsername,
    }),
    [username]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
