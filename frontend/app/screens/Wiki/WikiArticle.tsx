import { Link } from "react-router";
import { WIKI_ARTICLES, WIKI_CATEGORIES, type WikiArticle as Article } from "~/data/wiki";
import WikiLayout from "./WikiLayout";

const ORDER = WIKI_CATEGORIES.flatMap((category) => category.articles);

export default function WikiArticle({ article }: { article: Article }) {
  const index = ORDER.indexOf(article.slug);
  const previous = index > 0 ? WIKI_ARTICLES[ORDER[index - 1]] : undefined;
  const next =
    index < ORDER.length - 1 ? WIKI_ARTICLES[ORDER[index + 1]] : undefined;

  return (
    <WikiLayout>
      <nav className="wiki-breadcrumb" aria-label="Você está em">
        <Link to="/wiki">Wiki</Link> <span aria-hidden="true">›</span>{" "}
        {article.title}
      </nav>

      <article className="parchment wiki-article">
        <header className="wiki-article__header">
          <img
            className="pixelated"
            src={article.icon}
            alt=""
            width={56}
            height={56}
          />
          <div>
            <h1 className="title">{article.title}</h1>
            <p>{article.summary}</p>
          </div>
        </header>

        {article.sections.length > 2 && (
          <nav className="wiki-toc" aria-label="Nesta página">
            <strong className="font-pixel">Nesta página</strong>
            <ol>
              {article.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {article.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="wiki-article__section"
          >
            <h2 className="title">
              <a href={`#${section.id}`} className="wiki-anchor">
                {section.title}
              </a>
            </h2>
            {section.body}
          </section>
        ))}
      </article>

      <nav className="wiki-pager" aria-label="Outros artigos">
        {previous ? (
          <Link to={`/wiki/${previous.slug}`} className="btn btn--wood btn--small">
            ‹ {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/wiki/${next.slug}`} className="btn btn--small">
            {next.title} ›
          </Link>
        )}
      </nav>
    </WikiLayout>
  );
}
