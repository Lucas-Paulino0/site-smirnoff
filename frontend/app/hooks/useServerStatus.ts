import { useEffect, useState } from "react";
import type { ServerStatus } from "~/domain/ServerStatus";
import { getServerStatus } from "~/services/statusService";

const REFRESH_MS = 60 * 1000;

// undefined enquanto carrega, null se o backend não respondeu
export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus | null | undefined>(
    undefined
  );

  useEffect(() => {
    let active = true;

    const load = async () => {
      const result = await getServerStatus();
      if (active) setStatus(result ?? null);
    };

    load();
    const interval = setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return status;
}
