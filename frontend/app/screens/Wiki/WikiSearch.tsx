import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { classIcon, getClass } from "~/data/classes";
import { searchSections, searchWiki } from "~/data/wiki";
import { BOSSES, bossPath, familyPath, MOB_FAMILIES } from "~/data/world";
import {
  ITEM_BY_SLUG,
  MATERIAL_BY_SLUG,
  itemPath,
  jobName,
  materialPath,
  searchEntities,
} from "./entities";
import { useTrackEmptySearch } from "~/services/analytics";

// Caixa de busca do topo das páginas da wiki: sugere artigos, seções,
// classes, chefes, itens e materiais enquanto a pessoa digita.

type Suggestion = {
  to: string;
  label: string;
  detail: string;
  icon?: string;
};

const MAX_SUGGESTIONS = 10;

function suggest(query: string): { suggestions: Suggestion[]; total: number } {
  const entities = searchEntities(query);
  const all: Suggestion[] = [
    ...searchWiki(query).map((article) => ({
      to: `/wiki/${article.slug}`,
      label: article.title,
      detail: "Artigo",
      icon: article.icon,
    })),
    ...searchSections(query).map(({ article, section }) => ({
      to: `/wiki/${article.slug}#${section.id}`,
      label: section.title,
      detail: `Seção de ${article.title}`,
    })),
    ...entities.classes.map((id) => ({
      to: `/classes/${id}`,
      label: getClass(id)!.name,
      detail: "Classe",
      icon: classIcon(id),
    })),
    ...entities.bosses.map((name) => {
      const boss = BOSSES.find((b) => b.name === name)!;
      return {
        to: bossPath(name),
        label: name,
        detail: `${boss.role} · nível ${boss.levels}`,
      };
    }),
    ...entities.families.map((name) => {
      const family = MOB_FAMILIES.find((f) => f.name === name)!;
      return {
        to: familyPath(name),
        label: name,
        detail: `Monstros · níveis ${family.levels[0]} a ${family.levels[1]}`,
      };
    }),
    ...entities.items.map((slug) => {
      const item = ITEM_BY_SLUG[slug];
      return {
        to: itemPath(slug),
        label: item.name,
        detail: `${item.kind} · ${jobName(item.job)} ${item.level}`,
        icon: item.icon,
      };
    }),
    ...entities.materials.map((slug) => {
      const material = MATERIAL_BY_SLUG[slug];
      return {
        to: materialPath(slug),
        label: material.name,
        detail:
          material.source === "monstro"
            ? `Material de monstro · ${material.family}`
            : `Material de ${jobName(material.job!)} · nível ${material.level}`,
        icon: material.icon,
      };
    }),
  ];
  // um chefe também é seção do artigo Chefes: fica só a página dele
  const bossSections = new Set(entities.bosses.map((name) => bossPath(name).replace("/chefes/", "/chefes#")));
  const unique = all.filter(
    (s, i) => !bossSections.has(s.to) && all.findIndex((o) => o.to === s.to) === i
  );
  return { suggestions: unique.slice(0, MAX_SUGGESTIONS), total: unique.length };
}

export default function WikiSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const { suggestions, total } = suggest(query);
  const searching = query.trim().length > 0;
  useTrackEmptySearch(query, total === 0, "busca do topo");
  const allResults = `/wiki?q=${encodeURIComponent(query.trim())}`;

  // Fecha e limpa ao trocar de página
  useEffect(() => {
    setQuery("");
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + suggestions.length) % Math.max(suggestions.length, 1));
    } else if (event.key === "Enter" && searching) {
      event.preventDefault();
      navigate(suggestions[active]?.to ?? allResults);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="wiki-quicksearch" ref={boxRef}>
      <input
        type="search"
        className="wiki-search"
        placeholder="Buscar na wiki: artigos, itens, materiais, chefes..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-label="Buscar na wiki"
        aria-expanded={open && searching}
        aria-controls={listId}
        aria-activedescendant={open && suggestions[active] ? `${listId}-${active}` : undefined}
      />
      {open && searching && (
        <div className="wiki-quicksearch__panel">
          {suggestions.length === 0 ? (
            <p className="wiki-quicksearch__empty">Nada encontrado para "{query.trim()}".</p>
          ) : (
            <ul id={listId} role="listbox" aria-label="Sugestões">
              {suggestions.map((s, i) => (
                <li key={s.to} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <Link
                    to={s.to}
                    className={`wiki-quicksearch__item${i === active ? " wiki-quicksearch__item--active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="wiki-quicksearch__icon">
                      {s.icon && <img className="pixelated" src={s.icon} alt="" width={20} height={20} />}
                    </span>
                    <span>
                      <strong>{s.label}</strong>
                      <span className="wiki-quicksearch__detail">{s.detail}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {total > suggestions.length && (
            <Link to={allResults} className="wiki-quicksearch__all">
              Ver todos os {total} resultados
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
