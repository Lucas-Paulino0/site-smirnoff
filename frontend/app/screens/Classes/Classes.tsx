import { Fragment } from "react";
import { Link } from "react-router";
import {
  CLASSES,
  CLASS_LINES,
  RARITIES,
  classIcon,
  classesByRarity,
  getClass,
  rarityIcon,
  type Rarity,
} from "~/data/classes";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import "./Classes.css";

function ClassChip({ id }: { id: string }) {
  const rpgClass = getClass(id);
  if (!rpgClass) return null;

  return (
    <div className="class-chip">
      <img
        className="pixelated"
        src={classIcon(id)}
        alt=""
        width={48}
        height={48}
      />
      <span className="class-chip__name">{rpgClass.name}</span>
    </div>
  );
}

function RarityHeader({ rarity }: { rarity: Rarity }) {
  const count = classesByRarity(rarity.id).length;
  return (
    <div className="rarity-header">
      <img
        className="pixelated"
        src={rarityIcon(rarity.id)}
        alt=""
        width={56}
        height={56}
      />
      <div>
        <h2 className="title" style={{ color: rarity.color }}>
          Classes {rarity.label}
        </h2>
        <p className="muted">
          {count} {count === 1 ? "classe" : "classes"} · {rarity.how}
        </p>
      </div>
    </div>
  );
}

export default function Classes() {
  const [base, ...special] = RARITIES;

  return (
    <main className="page">
      <SectionHeading
        as="h1"
        title="Classes"
        subtitle={`São ${CLASSES.length} classes divididas em ${RARITIES.length} raridades. Todo jogador começa em uma das 4 linhas Base e evolui a cada 50 níveis.`}
      />

      <nav className="rarity-nav" aria-label="Raridades">
        {RARITIES.map((rarity) => (
          <a key={rarity.id} href={`#${rarity.id}`} className="rarity-nav__item">
            <img
              className="pixelated"
              src={rarityIcon(rarity.id)}
              alt=""
              width={28}
              height={28}
            />
            <span style={{ color: rarity.color }}>{rarity.label}</span>
          </a>
        ))}
      </nav>

      <section id={base.id} className="section rarity-section">
        <RarityHeader rarity={base} />
        <div className="lines">
          {CLASS_LINES.map((line) => (
            <article key={line.id} className="frame line">
              <h3 className="title line__title">Linha do {line.name}</h3>
              <div className="line__tiers">
                {line.tiers.map((tier, index) => (
                  <Fragment key={tier.level}>
                    {index > 0 && (
                      <span className="line__arrow" aria-hidden="true">
                        ▶
                      </span>
                    )}
                    <div className="tier">
                      <span className="badge">Nível {tier.level}</span>
                      <div className="tier__classes">
                        {tier.classes.map((id) => (
                          <ClassChip key={id} id={id} />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="parchment note">
          <strong className="font-pixel">Tickets de troca:</strong> depois da
          primeira classe da linha, cada evolução custa 1 ticket. A cada 50
          níveis você recebe uma missão que dá um ticket quando concluída.
        </p>
      </section>

      {special.map((rarity) => (
        <section key={rarity.id} id={rarity.id} className="section rarity-section">
          <RarityHeader rarity={rarity} />
          <div className="special-classes">
            {classesByRarity(rarity.id).map((rpgClass) => (
              <div
                key={rpgClass.id}
                className="special-class"
                style={{ "--rarity": rarity.color } as React.CSSProperties}
              >
                <img
                  className="pixelated"
                  src={classIcon(rpgClass.id)}
                  alt=""
                  width={80}
                  height={80}
                />
                <span className="special-class__name font-pixel">
                  {rpgClass.name}
                </span>
              </div>
            ))}
          </div>
          {rarity.id === "divinas" && (
            <div className="divinas-cta">
              <Link to="/loja" className="btn">
                Ver na loja
              </Link>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
