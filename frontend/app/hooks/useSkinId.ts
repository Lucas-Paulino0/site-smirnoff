import { useEffect, useState } from "react";
import { MINECRAFT_USERNAME } from "~/context/UserContext/UserProvider";
import { getPlayerUuid } from "~/services/playerService";

const DEBOUNCE_MS = 400;

// O que passar para o mc-heads.net: o UUID da conta original quando existe,
// senão o próprio nick. Pelo nick o mc-heads às vezes guarda uma busca que
// falhou e mostra o Steve por horas; pelo UUID sempre vem a skin certa.
// null enquanto busca ou se o nick é inválido.
export function useSkinId(nick: string | null) {
  const [skinId, setSkinId] = useState<string | null>(null);
  const valid = !!nick && MINECRAFT_USERNAME.test(nick);

  useEffect(() => {
    if (!valid) {
      setSkinId(null);
      return;
    }

    let active = true;
    const timeout = setTimeout(async () => {
      const uuid = await getPlayerUuid(nick);
      if (active) setSkinId(uuid || nick);
    }, DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [nick, valid]);

  return skinId;
}
