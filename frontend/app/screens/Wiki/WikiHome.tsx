import { useState } from "react";
import { Link } from "react-router";
import { SITE } from "~/config/site";
import {
  WIKI_ARTICLES,
  WIKI_CATEGORIES,
  searchWiki,
  type WikiArticle,
} from "~/data/wiki";
import WikiLayout from "./WikiLayout";

function ArticleCard({ article }: { article: WikiArticle }) {
  return (
    <Link to={`/wiki/${article.slug}`} className="wiki-card">
      <img
        className="pixelated"
        src={article.icon}
        alt=""
        width={40}
        height={40}
      />
      <div>
        <strong className="font-pixel">{article.title}</strong>
        <p>{article.summary}</p>
      </div>
    </Link>
  );
}

export default function WikiHome() {
  const [query, setQuery] = useState("");
  const results = searchWiki(query);
  const searching = query.trim().length > 0;

  return (
    <WikiLayout>
      <header className="wiki-home__header">
        <h1 className="title">Wiki do {SITE.name}</h1>
        <p className="muted">
          Tudo sobre o servidor: como começar, classes, atributos, chefes,
          comandos e muito mais.
        </p>
        <input
          type="search"
          className="wiki-search"
          placeholder="Buscar na wiki (ex.: atributos, home, chefe)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar na wiki"
        />
      </header>

      {searching ? (
        <section aria-live="polite">
          <h2 className="title wiki-home__group">
            {results.length > 0
              ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`
              : "Nada encontrado"}
          </h2>
          <div className="wiki-cards">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : (
        WIKI_CATEGORIES.map((category) => (
          <section key={category.title}>
            <h2 className="title wiki-home__group">{category.title}</h2>
            <div className="wiki-cards">
              {category.articles.map((slug) => (
                <ArticleCard key={slug} article={WIKI_ARTICLES[slug]} />
              ))}
            </div>
          </section>
        ))
      )}
    </WikiLayout>
  );
}
