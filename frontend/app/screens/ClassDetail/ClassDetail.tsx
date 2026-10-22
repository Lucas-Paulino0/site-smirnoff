import { Link } from "react-router";
import { CLASS_DETAILS } from "~/data/classDetails";
import {
  CLASSES,
  MAX_CLASS_POINTS,
  classIcon,
  getLine,
  getRarity,
  type RpgClass,
  type SkillNode,
  type TreeNode,
} from "~/data/classes";
import { Callout } from "~/screens/Wiki/components";
import "~/screens/Wiki/Wiki.css";
import "./ClassDetail.css";

const ROMAN = ["I", "II", "III"];

const decimal = (value: number) => String(value).replace(".", ",");

const pointsLabel = (points: number) =>
  points === 0 ? "grátis" : `${points} ${points === 1 ? "ponto" : "pontos"}`;

function Details({ node }: { node: SkillNode }) {
  return (
    <>
      {node.text && <p>{node.text}</p>}
      {node.details.length > 0 && (
        <ul className="skill__details">
          {node.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {node.notes?.map((note) => (
        <p key={note} className="skill__note">
          {note}
        </p>
      ))}
    </>
  );
}

function TreeItem({ node, label }: { node: TreeNode; label?: string }) {
  return (
    <div className="skill">
      <h4 className="skill__name">
        {label && <span className="skill__label">{label}</span>}
        {node.name}
        <span className="skill__meta">
          {pointsLabel(node.points)}
          {node.parent && ` · ligada a ${node.parent}`}
        </span>
      </h4>
      <Details node={node} />
    </div>
  );
}

function howToGet(rpgClass: RpgClass, level: number) {
  const line = getLine(rpgClass.id);
  if (line) {
    const tier = line.tiers.findIndex((t) => t.classes.includes(rpgClass.id));
    return tier === 0
      ? `Classe inicial da linha do ${line.name}`
      : `Evolução da linha do ${line.name} no nível ${level} (custa 1 ticket de troca)`;
  }
  return getRarity(rpgClass.rarity).how;
}

export default function ClassDetail({ rpgClass }: { rpgClass: RpgClass }) {
  const details = CLASS_DETAILS[rpgClass.id];
  const rarity = getRarity(rpgClass.rarity);
  const skills = details.skills;
  const index = CLASSES.indexOf(rpgClass);
  const previous = CLASSES[index - 1];
  const next = CLASSES[index + 1];

  return (
    <main className="page">
      <nav className="wiki-breadcrumb" aria-label="Você está em">
        <Link to="/classes">Classes</Link> <span aria-hidden="true">›</span>{" "}
        {rpgClass.name}
      </nav>

      <article className="wiki-article">
        <header className="wiki-article__header">
          <img
            className="pixelated"
            src={classIcon(rpgClass.id)}
            alt=""
            width={96}
            height={96}
          />
          <div>
            <h1 className="title">{rpgClass.name}</h1>
            <span className="badge" style={{ color: rarity.color }}>
              {rarity.label}
            </span>
          </div>
        </header>

        {details.description && (
          <p className="class-detail__lead">{details.description}</p>
        )}

        <dl className="class-facts">
          <div>
            <dt>Como conseguir</dt>
            <dd>
              {howToGet(rpgClass, details.level)}
              {rpgClass.rarity === "divinas" && (
                <>
                  {" "}
                  (<Link to="/loja">ver na loja</Link>)
                </>
              )}
            </dd>
          </div>
          <div>
            <dt>Nível mínimo</dt>
            <dd>{details.level}</dd>
          </div>
          {details.weapon && (
            <div>
              <dt>Arma</dt>
              <dd>
                {details.weapon.name}
                {details.weapon.twoItems &&
                  (details.weapon.offhand
                    ? ` + ${details.weapon.offhand} na outra mão`
                    : `, uma em cada mão`)}{" "}
                (dano {details.weapon.damage})
              </dd>
            </div>
          )}
          {details.resource && (
            <div>
              <dt>Habilidades gastam</dt>
              <dd>{details.resource}</dd>
            </div>
          )}
          <div>
            <dt>Bônus da classe</dt>
            <dd>
              {details.stats
                .map((stat) => `+${stat.value} ${stat.name}`)
                .join(" · ")}
            </dd>
          </div>
        </dl>

        <section id="habilidades" className="wiki-article__section">
          <h2 className="title">Habilidades</h2>
          {!skills ? (
            <Callout title="Em breve">
              As habilidades desta classe ainda estão sendo criadas.
            </Callout>
          ) : (
            <>
              <p>
                A árvore inteira custa <strong>{skills.totalCost} pontos</strong>{" "}
                e você chega a no máximo {MAX_CLASS_POINTS} (1 a cada 5 níveis),
                então escolha bem. Veja como funcionam em{" "}
                <Link to="/wiki/habilidades" className="wiki-link">
                  Habilidades
                </Link>
                .
              </p>

              <h3 className="skill-group">Básica (clique esquerdo, grátis)</h3>
              <div className="skill">
                <h4 className="skill__name">{skills.base.name}</h4>
                <Details node={skills.base} />
              </div>

              {skills.corePassives.length > 0 && (
                <>
                  <h3 className="skill-group">Passivas da classe</h3>
                  {skills.corePassives.map((passive) => (
                    <TreeItem key={passive.name} node={passive} />
                  ))}
                </>
              )}

              <h3 className="skill-group">Barra de habilidades</h3>
              {skills.bar.map((skill) => (
                <div key={skill.name} className="skill skill--bar">
                  <h4 className="skill__name">
                    <span className="skill__label">{skill.slot}</span>
                    {skill.name}
                    <span className="skill__meta">
                      {pointsLabel(skill.points)} · recarga{" "}
                      {decimal(skill.cooldown)} s · {skill.cost.amount}{" "}
                      {skill.cost.resource} no nível 1
                    </span>
                  </h4>
                  <Details node={skill} />
                  {skill.aimRange && (
                    <p className="skill__note">
                      Mire num bloco a até {skill.aimRange} blocos: um anel no
                      chão mostra onde ela vai cair.
                    </p>
                  )}
                  <div className="skill__upgrades">
                    {skill.upgrades.map((upgrade, u) => (
                      <TreeItem
                        key={upgrade.name}
                        node={upgrade}
                        label={`Melhoria ${ROMAN[u]}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {skills.passives.length > 0 && (
                <>
                  <h3 className="skill-group">Passivas da árvore</h3>
                  {skills.passives.map((passive) => (
                    <TreeItem key={passive.name} node={passive} />
                  ))}
                </>
              )}

              <h3 className="skill-group">Caminho final (escolha um)</h3>
              <p>
                Libera com {skills.requiresSpent} pontos já gastos na árvore.
                Os dois caminhos se excluem.
              </p>
              {skills.paths.map((path) => (
                <TreeItem key={path.name} node={path} />
              ))}
            </>
          )}
        </section>
      </article>

      <nav className="wiki-pager" aria-label="Outras classes">
        {previous ? (
          <Link
            to={`/classes/${previous.id}`}
            className="btn btn--ghost btn--small"
          >
            ‹ {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/classes/${next.id}`} className="btn btn--ghost btn--small">
            {next.name} ›
          </Link>
        )}
      </nav>
    </main>
  );
}
