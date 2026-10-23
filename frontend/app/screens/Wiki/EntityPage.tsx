import { Link } from "react-router";
import WikiLayout from "./WikiLayout";

// Esqueleto das páginas de item e de material: trilha, cabeçalho, ficha ao
// lado (em cima no celular) e as seções.

export type InfoRow = [string, React.ReactNode];

export default function EntityPage({
  trail,
  title,
  subtitle,
  icon,
  picture,
  info,
  children,
}: {
  trail: { to: string; label: string }[];
  title: string;
  subtitle: string;
  icon?: string;
  // render grande do modelo (chefes), no lugar do ícone da ficha
  picture?: string;
  info: InfoRow[];
  children: React.ReactNode;
}) {
  return (
    <WikiLayout>
      <nav className="wiki-breadcrumb" aria-label="Você está em">
        <Link to="/wiki">Wiki</Link>
        {trail.map((step) => (
          <span key={step.to}>
            {" "}
            <span aria-hidden="true">›</span> <Link to={step.to}>{step.label}</Link>
          </span>
        ))}{" "}
        <span aria-hidden="true">›</span> {title}
      </nav>

      <article className="wiki-article wiki-entity">
        <header className="wiki-article__header">
          {icon && <img className="pixelated" src={icon} alt="" width={56} height={56} />}
          <div>
            <h1 className="title">{title}</h1>
            <p>{subtitle}</p>
          </div>
        </header>

        <div className="wiki-entity__body">
          <aside className="infobox" aria-label={`Ficha de ${title}`}>
            <strong className="infobox__title font-head">{title}</strong>
            {picture ? (
              <div className="infobox__image infobox__image--picture">
                <img src={picture} alt={title} width={260} height={260} />
              </div>
            ) : icon && (
              <div className="infobox__image">
                <img className="pixelated" src={icon} alt={title} width={96} height={96} />
              </div>
            )}
            <dl>
              {info.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="wiki-entity__main">{children}</div>
        </div>
      </article>
    </WikiLayout>
  );
}

export function EntitySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="wiki-article__section">
      <h2 className="title">
        <a href={`#${id}`} className="wiki-anchor">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}
