import { Link } from "react-router";
import { CLASS_DETAILS } from "~/data/classDetails";
import {
  CLASSES,
  CLASS_LINES,
  RARITIES,
  classIcon,
  classesByRarity,
  rarityIcon,
  type Rarity,
} from "~/data/classes";
import ClassLines from "~/ui/ClassLines/ClassLines";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import "./Classes.css";

const withSkills = CLASSES.filter((c) => CLASS_DETAILS[c.id]?.skills);

function RarityHeader({ rarity }: { rarity: Rarity }) {
  const count = classesByRarity(rarity.id).length;
  return (
    <div className="rarity-header">
      <img
        className="pixelated"
        src={rarityIcon(rarity.id)}
        alt=""
        width={40}
        height={40}
      />
      <div>
        <h2 className="title" style={{ color: rarity.color }}>
          {rarity.label}
        </h2>
        <p className="muted">
          {count} {count === 1 ? "classe" : "classes"}. {rarity.how}.
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
        subtitle={`São ${CLASSES.length} classes divididas em ${RARITIES.length} raridades. Todo jogador começa em uma das ${CLASS_LINES.length} linhas Base e evolui a cada 50 níveis. Clique numa classe para ver arma, bônus e habilidades.`}
      />

      <nav className="rarity-nav" aria-label="Raridades">
        {RARITIES.map((rarity) => (
          <a key={rarity.id} href={`#${rarity.id}`}>
            {rarity.label}
          </a>
        ))}
      </nav>

      <section id={base.id} className="section rarity-section">
        <RarityHeader rarity={base} />
        <ClassLines showSoon />
        <div className="class-notes">
          <p>
            <strong>Tickets de troca.</strong> Depois da primeira classe da
            linha, cada evolução custa 1 ticket. A cada 50 níveis você recebe
            uma missão que dá um ticket quando concluída.
          </p>
          <p>
            <strong>Habilidades.</strong> {withSkills.length} das{" "}
            {CLASSES.length} classes já têm habilidades e árvore de talentos no
            jogo; faltam{" "}
            {CLASSES.filter((c) => !CLASS_DETAILS[c.id]?.skills)
              .map((c) => c.name)
              .join(" e ")}
            . <Link to="/wiki/habilidades">Como funcionam</Link>
          </p>
        </div>
      </section>

      {special.map((rarity) => (
        <section key={rarity.id} id={rarity.id} className="section rarity-section">
          <RarityHeader rarity={rarity} />
          <ul className="special-classes">
            {classesByRarity(rarity.id).map((rpgClass) => (
              <li key={rpgClass.id}>
                <Link to={`/classes/${rpgClass.id}`} className="special-class">
                  <img
                    className="pixelated"
                    src={classIcon(rpgClass.id)}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <span>
                    <span className="special-class__name">{rpgClass.name}</span>
                    {!CLASS_DETAILS[rpgClass.id]?.skills && (
                      <small>Habilidades em breve</small>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {rarity.id === "divinas" && (
            <p className="muted divinas-note">
              As classes Divinas ficam na <Link to="/loja">loja</Link>.
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
