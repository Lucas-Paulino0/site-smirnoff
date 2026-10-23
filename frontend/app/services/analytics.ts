import { useEffect, useRef } from "react";

// Contagem de visitas pelo Umami (ver SITE.analyticsId): sem cookies e sem
// dados pessoais. As páginas visitadas o próprio script conta; aqui ficam os
// eventos que só o site sabe (IP copiado, carrinho, buscas sem resultado).

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

export const track = (name: string, data?: EventData) => {
  try {
    window.umami?.track(name, data);
  } catch {
    // contagem nunca atrapalha o site
  }
};

// Busca que não achou nada: mostra o que os jogadores procuram e a wiki não tem.
// Espera a pessoa parar de digitar e conta cada termo uma vez só.
export function useTrackEmptySearch(query: string, empty: boolean, where: string) {
  const sent = useRef(new Set<string>());
  useEffect(() => {
    const term = query.trim().toLowerCase();
    if (!empty || term.length < 3 || sent.current.has(term)) return;
    const timer = setTimeout(() => {
      sent.current.add(term);
      track("busca-sem-resultado", { termo: term.slice(0, 100), onde: where });
    }, 1500);
    return () => clearTimeout(timer);
  }, [query, empty, where]);
}
