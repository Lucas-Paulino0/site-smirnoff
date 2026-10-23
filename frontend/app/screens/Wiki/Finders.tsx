import { useState } from "react";
import { JOB_ITEMS, JOB_MATERIALS, type JobId, type JobItem } from "~/data/jobs";
import { matchesTerms, searchTerms } from "~/data/search";
import { MAP_AREAS } from "~/data/worldMap";
import { Region, Table } from "./components";
import { DropFamilyLink, ItemLink, jobName, MaterialLink, MaterialList } from "./entities";

// Filtros das tabelas grandes da wiki (Receitas e Materiais)

const CRAFTING_JOBS: JobId[] = ["blacksmith", "armorer", "jeweler", "alchemist", "culinarian"];
const GATHERING_JOBS: JobId[] = ["miner", "woodcutter", "fisher", "gatherer"];

// "Colar de Força" -> "Colar", "Poção de Mana" -> "Poção"
export function kindGroup(item: JobItem) {
  if (item.type === "potion") return "Poção";
  if (item.type === "food") return "Prato";
  return item.kind.split(" ")[0];
}

const KIND_ORDER = [
  "Espada", "Adaga", "Arco", "Cajado", "Machado",
  "Capacete", "Peitoral", "Calças", "Botas",
  "Colar", "Brinco", "Anel", "Poção", "Prato",
];

const RECIPE_LEVELS = [...new Set(JOB_ITEMS.map((item) => item.level))].sort((a, b) => a - b);

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="wiki-filter">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todos</option>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextFilter({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="wiki-filter wiki-filter--text">
      <span>Nome</span>
      <input type="search" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Results({ count, onClear, children }: { count: number; onClear: () => void; children: React.ReactNode }) {
  return (
    <>
      <p className="wiki-filters__count" aria-live="polite">
        {count === 0 ? "Nada encontrado com esses filtros." : `${count} ${count === 1 ? "resultado" : "resultados"}.`}{" "}
        <button type="button" className="wiki-filters__clear" onClick={onClear}>
          Limpar filtros
        </button>
      </p>
      {count > 0 && children}
    </>
  );
}

export function RecipeFinder() {
  const [text, setText] = useState("");
  const [job, setJob] = useState("");
  const [kind, setKind] = useState("");
  const [level, setLevel] = useState("");
  const active = Boolean(text.trim() || job || kind || level);

  const terms = searchTerms(text);
  const items = JOB_ITEMS.filter(
    (item) =>
      (!terms.length || matchesTerms(terms, `${item.name} ${item.kind}`)) &&
      (!job || item.job === job) &&
      (!kind || kindGroup(item) === kind) &&
      (!level || item.level === Number(level))
  );

  const clear = () => {
    setText("");
    setJob("");
    setKind("");
    setLevel("");
  };

  return (
    <div className="wiki-filters">
      <div className="wiki-filters__bar">
        <TextFilter value={text} onChange={setText} placeholder="ex.: ferro, colar de força" />
        <Select
          label="Profissão"
          value={job}
          onChange={setJob}
          options={CRAFTING_JOBS.map((id) => [id, jobName(id)])}
        />
        <Select label="Tipo" value={kind} onChange={setKind} options={KIND_ORDER.map((k) => [k, k])} />
        <Select
          label="Nível"
          value={level}
          onChange={setLevel}
          options={RECIPE_LEVELS.map((l) => [String(l), `Nível ${l}`])}
        />
      </div>
      {active ? (
        <Results count={items.length} onClear={clear}>
          <Table
            head={["Item", "Profissão", "Nível", "Materiais"]}
            rows={items.map((item) => [
              <ItemLink slug={item.slug} />,
              jobName(item.job),
              item.level,
              <MaterialList materials={item.materials} />,
            ])}
          />
        </Results>
      ) : (
        <p className="wiki-filters__hint">
          Escolha um filtro para ver as receitas que combinam, ou veja todas por
          profissão logo abaixo.
        </p>
      )}
    </div>
  );
}

export function MaterialFinder() {
  const [text, setText] = useState("");
  const [origin, setOrigin] = useState("");
  const [region, setRegion] = useState("");
  const [level, setLevel] = useState("");
  const [usedOnly, setUsedOnly] = useState(false);
  const active = Boolean(text.trim() || origin || region || level || usedOnly);

  const terms = searchTerms(text);
  const lvl = Number(level);
  const materials = JOB_MATERIALS.filter((m) => {
    if (terms.length && !matchesTerms(terms, m.name)) return false;
    if (origin === "monstro" && m.source !== "monstro") return false;
    if (origin && origin !== "monstro" && m.job !== origin) return false;
    if (region) {
      const area = MAP_AREAS.find((a) => a.name === region)!;
      // materiais de monstro não têm região: vale a faixa de nível dela
      const [min, max] = m.levels.split(" a ").map(Number);
      const inArea = m.region ? m.region === region : min <= area.maxLevel && (max || min) >= area.minLevel;
      if (!inArea) return false;
    }
    if (level) {
      const [min, max] = m.levels.split(" a ").map(Number);
      if (lvl < min || lvl > (max || min)) return false;
    }
    if (usedOnly && m.usedBy.length + m.tools.length === 0) return false;
    return true;
  });

  const clear = () => {
    setText("");
    setOrigin("");
    setRegion("");
    setLevel("");
    setUsedOnly(false);
  };

  return (
    <div className="wiki-filters">
      <div className="wiki-filters__bar">
        <TextFilter value={text} onChange={setText} placeholder="ex.: minério, esporo" />
        <Select
          label="De onde vem"
          value={origin}
          onChange={setOrigin}
          options={[
            ...GATHERING_JOBS.map((id): [string, string] => [id, `Coleta: ${jobName(id)}`]),
            ["monstro", "Monstros"],
          ]}
        />
        <Select label="Região" value={region} onChange={setRegion} options={MAP_AREAS.map((a) => [a.name, a.name])} />
        <label className="wiki-filter wiki-filter--level">
          <span>Nível da área</span>
          <input
            type="number"
            min={1}
            max={1000}
            inputMode="numeric"
            placeholder="ex.: 35"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        <label className="wiki-filter wiki-filter--check">
          <input type="checkbox" checked={usedOnly} onChange={(e) => setUsedOnly(e.target.checked)} />
          <span>Só os usados em receitas</span>
        </label>
      </div>
      {active ? (
        <Results count={materials.length} onClear={clear}>
          <Table
            head={["Material", "De onde vem", "Níveis", "Receitas"]}
            rows={materials.map((m) => [
              <MaterialLink slug={m.slug} />,
              m.source === "monstro" ? (
                <DropFamilyLink drop={m.family!} />
              ) : (
                <>
                  {m.spot} ({jobName(m.job!)})
                  <br />
                  <Region name={m.region!} />
                </>
              ),
              m.levels,
              m.usedBy.length + m.tools.length || "Nenhuma ainda",
            ])}
          />
        </Results>
      ) : (
        <p className="wiki-filters__hint">
          Escolha um filtro para achar um material, ou veja a lista completa
          por profissão logo abaixo.
        </p>
      )}
    </div>
  );
}
