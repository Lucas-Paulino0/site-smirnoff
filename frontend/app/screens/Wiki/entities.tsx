import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { CLASS_DETAILS } from "~/data/classDetails";
import { CLASSES, classIcon, getClass, getRarity } from "~/data/classes";
import {
  JOB_ITEMS,
  JOB_MATERIALS,
  JOBS,
  type JobId,
  type JobItem,
  type JobMaterial,
} from "~/data/jobs";
import { matchesTerms, searchTerms } from "~/data/search";
import { BOSSES, bossAnchor, type Boss } from "~/data/world";

// Coisas do jogo citadas na wiki: cada uma vira um link com um cartão de
// resumo ao passar o mouse.

export const ITEM_BY_SLUG = Object.fromEntries(JOB_ITEMS.map((item) => [item.slug, item]));
export const MATERIAL_BY_SLUG = Object.fromEntries(
  JOB_MATERIALS.map((material) => [material.slug, material])
);

export const jobName = (id: JobId) => JOBS.find((job) => job.id === id)?.name ?? id;

export const itemPath = (slug: string) => `/wiki/itens/${slug}`;
export const materialPath = (slug: string) => `/wiki/materiais/${slug}`;

// Linha "de onde vem" de um material
export function materialSource(material: JobMaterial) {
  if (material.source === "monstro") {
    return `Cai de ${material.family!.toLowerCase()}, níveis ${material.levels}`;
  }
  return `${material.special ? "Achado raro" : "Coleta"} de ${material.spot} (${jobName(material.job!)}), nível ${material.level}`;
}

// Busca da wiki: itens, materiais, classes e chefes cujo nome tem todos os termos
export function searchEntities(query: string) {
  const terms = searchTerms(query);
  const matches = (name: string) => matchesTerms(terms, name);
  return {
    items: JOB_ITEMS.filter((item) => matches(item.name)).map((item) => item.slug),
    materials: JOB_MATERIALS.filter((m) => matches(m.name)).map((m) => m.slug),
    classes: CLASSES.filter((c) => matches(c.name)).map((c) => c.id),
    bosses: BOSSES.filter((b) => matches(b.name)).map((b) => b.name),
  };
}

const HOVER_DELAY = 120;
const CARD_WIDTH = 300;

// Cartão que abre sobre o link. Fica fora da árvore (portal) para não ser
// cortado pelas tabelas com rolagem, e só existe em telas com mouse.
export function Hover({ card, children }: { card: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [position, setPosition] = useState<{ left: number; top: number; below: boolean } | null>(
    null
  );

  const hide = () => {
    window.clearTimeout(timer.current);
    setPosition(null);
  };

  const show = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const below = rect.top < 240;
      const half = CARD_WIDTH / 2 + 12;
      setPosition({
        left: Math.min(Math.max(rect.left + rect.width / 2, half), window.innerWidth - half),
        top: below ? rect.bottom + 8 : rect.top - 8,
        below,
      });
    }, HOVER_DELAY);
  };

  useEffect(() => {
    if (!position) return;
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => window.removeEventListener("scroll", hide);
  }, [position]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span ref={ref} className="hover" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {position &&
        createPortal(
          <div
            className={`hover-card${position.below ? " hover-card--below" : ""}`}
            role="tooltip"
            style={{ left: position.left, top: position.top, width: CARD_WIDTH }}
          >
            {card}
          </div>,
          document.body
        )}
    </span>
  );
}

function CardHead({ icon, title, subtitle }: { icon?: string; title: string; subtitle: string }) {
  return (
    <div className="hover-card__head">
      {icon && <img className="pixelated" src={icon} alt="" width={32} height={32} />}
      <div>
        <strong className="font-head">{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export function MaterialCard({ material }: { material: JobMaterial }) {
  const uses = material.usedBy.length + material.tools.length;
  return (
    <>
      <CardHead
        icon={material.icon}
        title={material.name}
        subtitle={material.source === "monstro" ? "Material de monstro" : `Material de ${jobName(material.job!)}`}
      />
      <p>{materialSource(material)}.</p>
      {material.region && <p>Região: {material.region}.</p>}
      <p className="hover-card__muted">
        {uses === 0 ? "Ainda não é usado em nenhuma receita." : `Usado em ${uses} ${uses === 1 ? "receita" : "receitas"}.`}
      </p>
    </>
  );
}

export function ItemCard({ item }: { item: JobItem }) {
  return (
    <>
      <CardHead icon={item.icon} title={item.name} subtitle={`${item.kind} · nível ${item.level}`} />
      {item.stat && <p>{item.stat}</p>}
      {item.bonus.length > 0 && (
        <p>
          <span className="rarity rarity--5">Mítico:</span> {item.bonus.join(", ")}
        </p>
      )}
      <p className="hover-card__muted">Fabricado pelo {jobName(item.job)}.</p>
    </>
  );
}

export function BossCard({ boss }: { boss: Boss }) {
  return (
    <>
      <CardHead title={boss.name} subtitle={`${boss.role} · nível ${boss.levels}`} />
      <p>{boss.where}.</p>
      <p className="hover-card__muted">Volta {boss.respawn} minutos depois de derrotado.</p>
    </>
  );
}

function ClassCard({ id }: { id: string }) {
  const rpgClass = getClass(id)!;
  const weapon = CLASS_DETAILS[id]?.weapon;
  const rarity = getRarity(rpgClass.rarity);
  return (
    <>
      <CardHead icon={classIcon(id)} title={rpgClass.name} subtitle={`Classe · ${rarity.label}`} />
      <p>{rarity.how}.</p>
      {weapon && <p>Arma: {weapon.name}.</p>}
    </>
  );
}

export function MaterialLink({
  slug,
  amount,
  icon = true,
}: {
  slug: string;
  amount?: number;
  icon?: boolean;
}) {
  const material = MATERIAL_BY_SLUG[slug];
  if (!material) return <>{slug}</>;
  return (
    <Hover card={<MaterialCard material={material} />}>
      <Link to={materialPath(slug)} className="wiki-link entity">
        {icon && material.icon && (
          <img className="entity__icon pixelated" src={material.icon} alt="" width={16} height={16} />
        )}
        {amount !== undefined && `${amount} `}
        {material.name}
      </Link>
    </Hover>
  );
}

export function ItemLink({ slug, icon = true }: { slug: string; icon?: boolean }) {
  const item = ITEM_BY_SLUG[slug];
  if (!item) return <>{slug}</>;
  return (
    <Hover card={<ItemCard item={item} />}>
      <Link to={itemPath(slug)} className="wiki-link entity">
        {icon && item.icon && (
          <img className="entity__icon pixelated" src={item.icon} alt="" width={16} height={16} />
        )}
        {item.name}
      </Link>
    </Hover>
  );
}

export function BossLink({ name }: { name: string }) {
  const boss = BOSSES.find((b) => b.name === name);
  if (!boss) return <>{name}</>;
  return (
    <Hover card={<BossCard boss={boss} />}>
      <Link to={`/wiki/chefes#${bossAnchor(boss.name)}`} className="wiki-link entity">
        {boss.name}
      </Link>
    </Hover>
  );
}

export function ClassLink({ id }: { id: string }) {
  const rpgClass = getClass(id);
  if (!rpgClass) return <>{id}</>;
  return (
    <Hover card={<ClassCard id={id} />}>
      <Link to={`/classes/${id}`} className="wiki-link entity">
        {rpgClass.name}
      </Link>
    </Hover>
  );
}

// Lista de materiais com quantidade: "10 Minério de Cobre, 2 Quartzo"
export function MaterialList({ materials }: { materials: [string, number][] }) {
  return (
    <>
      {materials.map(([slug, amount], i) => (
        <span key={slug}>
          {i > 0 && ", "}
          <MaterialLink slug={slug} amount={amount} />
        </span>
      ))}
    </>
  );
}
