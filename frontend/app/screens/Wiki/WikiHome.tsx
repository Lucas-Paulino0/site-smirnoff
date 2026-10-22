import { useState } from "react";
import { Link } from "react-router";
import { SITE } from "~/config/site";
import {
  WIKI_ARTICLES,
  WIKI_CATEGORIES,
  searchWiki,
  type WikiArticle,
} from "~/data/wiki";
import { ItemLink, MaterialLink, searchEntities } from "./entities";
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
        <strong className="font-head">{article.title}</strong>
        <p>{article.summary}</p>
      </div>
    </Link>
  );
}

export default function WikiHome() {
  const [query, setQuery] = useState("");
  const results = searchWiki(query);
  const entities = searchEntities(query);
  const searching = query.trim().length > 0;
  const found = results.length + entities.items.length + entities.materials.length;

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
        <section className="wiki-results" aria-live="polite">
          <h2 className="title wiki-home__group">
            {found > 0 ? `${found} ${found === 1 ? "resultado" : "resultados"}` : "Nada encontrado"}
          </h2>
          <div className="wiki-cards">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          {entities.items.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Itens</h3>
              <ul className="wiki-columns">
                {entities.items.map((slug) => (
                  <li key={slug}>
                    <ItemLink slug={slug} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {entities.materials.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Materiais</h3>
              <ul className="wiki-columns">
                {entities.materials.map((slug) => (
                  <li key={slug}>
                    <MaterialLink slug={slug} />
                  </li>
                ))}
              </ul>
            </>
          )}
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
