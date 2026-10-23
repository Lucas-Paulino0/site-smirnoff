import { useState } from "react";
import { useSearchParams } from "react-router";
import { JOB_ITEMS, RECIPE_CATEGORIES } from "~/data/jobs";
import { matchesTerms, searchTerms } from "~/data/search";
import { Table } from "./components";
import { ITEM_BY_SLUG, ItemLink, jobName, MATERIAL_BY_SLUG, MaterialLink, materialSource } from "./entities";

// Calculadora de materiais: escolha itens e quantidades e veja o total de
// materiais. A lista fica no endereço (?i=espada-de-cobre:2,adaga-de-cobre:1)
// para dar para compartilhar.

type Entry = [slug: string, quantity: number];

const MAX_QUANTITY = 999;

export const calculatorPath = (slug: string, quantity = 1) => `/wiki/calculadora?i=${slug}:${quantity}`;

function parse(value: string | null): Entry[] {
  if (!value) return [];
  const entries: Entry[] = [];
  for (const part of value.split(",")) {
    const [slug, n] = part.split(":");
    const quantity = Math.min(Math.max(Math.floor(Number(n) || 1), 1), MAX_QUANTITY);
    if (ITEM_BY_SLUG[slug] && !entries.some(([s]) => s === slug)) entries.push([slug, quantity]);
  }
  return entries;
}

const serialize = (entries: Entry[]) => entries.map(([slug, n]) => `${slug}:${n}`).join(",");

// fabricações para chegar na quantidade (poções saem de várias por vez)
const craftsFor = (slug: string, quantity: number) => Math.ceil(quantity / ITEM_BY_SLUG[slug].amount);

export default function Calculator() {
  const [params, setParams] = useSearchParams();
  const entries = parse(params.get("i"));
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const save = (next: Entry[]) => {
    setCopied(false);
    setParams(next.length ? { i: serialize(next) } : {}, { replace: true, preventScrollReset: true });
  };

  const add = (slugs: string[]) => {
    const next = [...entries];
    for (const slug of slugs) {
      if (!next.some(([s]) => s === slug)) next.push([slug, 1]);
    }
    save(next);
    setQuery("");
  };

  const setQuantity = (slug: string, value: string) => {
    const quantity = Math.min(Math.max(Math.floor(Number(value) || 1), 1), MAX_QUANTITY);
    save(entries.map(([s, n]) => (s === slug ? [s, quantity] : [s, n])));
  };

  const terms = searchTerms(query);
  const suggestions = terms.length
    ? JOB_ITEMS.filter((item) => matchesTerms(terms, item.name) && !entries.some(([s]) => s === item.slug)).slice(0, 8)
    : [];

  // soma dos materiais
  const totals = new Map<string, number>();
  for (const [slug, quantity] of entries) {
    const crafts = craftsFor(slug, quantity);
    for (const [material, n] of ITEM_BY_SLUG[slug].materials) {
      totals.set(material, (totals.get(material) ?? 0) + n * crafts);
    }
  }
  const materials = [...totals.entries()].sort(([a], [b]) => {
    const ma = MATERIAL_BY_SLUG[a];
    const mb = MATERIAL_BY_SLUG[b];
    return ma.source.localeCompare(mb.source) || ma.level - mb.level || ma.name.localeCompare(mb.name);
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="calculator">
      <div className="wiki-filters__bar">
        <label className="wiki-filter wiki-filter--text calculator__search">
          <span>Adicionar item</span>
          <input
            type="search"
            value={query}
            placeholder="ex.: peitoral de ferro"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && suggestions[0]) {
                e.preventDefault();
                add([suggestions[0].slug]);
              }
              if (e.key === "Escape") setQuery("");
            }}
          />
          {suggestions.length > 0 && (
            <ul className="calculator__suggestions">
              {suggestions.map((item) => (
                <li key={item.slug}>
                  <button type="button" onClick={() => add([item.slug])}>
                    {item.icon && <img className="pixelated" src={item.icon} alt="" width={16} height={16} />}
                    {item.name}
                    <span className="muted">
                      {" "}
                      · {jobName(item.job)} {item.level}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>
        <label className="wiki-filter">
          <span>Ou uma categoria inteira</span>
          <select
            value=""
            onChange={(e) => {
              const category = RECIPE_CATEGORIES.find((c) => `${c.job}:${c.name}` === e.target.value);
              if (category) add(category.items);
            }}
          >
            <option value="">Escolher...</option>
            {RECIPE_CATEGORIES.map((c) => (
              <option key={`${c.job}:${c.name}`} value={`${c.job}:${c.name}`}>
                {c.name} ({jobName(c.job)} {c.level})
              </option>
            ))}
          </select>
        </label>
      </div>

      {entries.length === 0 ? (
        <p className="wiki-filters__hint">
          Adicione itens pelo nome ou uma categoria inteira (por exemplo,
          Armaduras de Ferro para a armadura completa).
        </p>
      ) : (
        <>
          <h3>Itens</h3>
          <Table
            head={["Item", "Quantidade", "Fabricações", ""]}
            rows={entries.map(([slug, quantity]) => [
              <ItemLink slug={slug} />,
              <input
                className="calculator__quantity"
                type="number"
                min={1}
                max={MAX_QUANTITY}
                inputMode="numeric"
                aria-label={`Quantidade de ${ITEM_BY_SLUG[slug].name}`}
                value={quantity}
                onChange={(e) => setQuantity(slug, e.target.value)}
              />,
              ITEM_BY_SLUG[slug].amount > 1
                ? `${craftsFor(slug, quantity)} (faz ${ITEM_BY_SLUG[slug].amount} por vez)`
                : craftsFor(slug, quantity),
              <button
                type="button"
                className="calculator__remove"
                onClick={() => save(entries.filter(([s]) => s !== slug))}
                aria-label={`Tirar ${ITEM_BY_SLUG[slug].name}`}
              >
                Tirar
              </button>,
            ])}
          />

          <h3>Materiais no total</h3>
          <Table
            head={["Material", "Total", "De onde vem"]}
            rows={materials.map(([slug, total]) => [
              <MaterialLink slug={slug} />,
              <strong>{total.toLocaleString("pt-BR")}</strong>,
              materialSource(MATERIAL_BY_SLUG[slug]),
            ])}
          />

          <p className="calculator__actions">
            <button type="button" className="btn btn--ghost" onClick={copyLink}>
              {copied ? "Link copiado" : "Copiar link desta lista"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => save([])}>
              Limpar lista
            </button>
          </p>
        </>
      )}
    </div>
  );
}
