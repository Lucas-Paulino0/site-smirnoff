import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { SITE } from "~/config/site";
import {
  WIKI_ARTICLES,
  WIKI_CATEGORIES,
  searchSections,
  searchWiki,
  type WikiArticle,
} from "~/data/wiki";
import { bossAnchor } from "~/data/world";
import { BossLink, ClassLink, FamilyLink, ItemLink, MaterialLink, searchEntities } from "./entities";
import WikiLayout from "./WikiLayout";
import { useTrackEmptySearch } from "~/services/analytics";

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
  const [params, setParams] = useSearchParams();
  const [query, setQueryState] = useState(params.get("q") ?? "");
  // o texto fica no endereço para o "Ver todos os resultados" da busca rápida
  const setQuery = (value: string) => {
    setQueryState(value);
    setParams(value ? { q: value } : {}, { replace: true, preventScrollReset: true });
  };
  const results = searchWiki(query);
  const entities = searchEntities(query);
  // os chefes já aparecem no grupo deles
  const bossSections = new Set(entities.bosses.map((name) => `chefes#${bossAnchor(name)}`));
  const sections = searchSections(query).filter(
    ({ article, section }) => !bossSections.has(`${article.slug}#${section.id}`)
  );
  const searching = query.trim().length > 0;
  const found =
    results.length +
    sections.length +
    entities.classes.length +
    entities.bosses.length +
    entities.families.length +
    entities.items.length +
    entities.materials.length;
  useTrackEmptySearch(query, found === 0, "início da wiki");

  return (
    <WikiLayout search={false}>
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
          {sections.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Seções</h3>
              <ul className="wiki-columns">
                {sections.map(({ article, section }) => (
                  <li key={`${article.slug}#${section.id}`}>
                    <Link to={`/wiki/${article.slug}#${section.id}`} className="wiki-link">
                      {section.title}
                    </Link>{" "}
                    <span className="muted">em {article.title}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {entities.classes.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Classes</h3>
              <ul className="wiki-columns">
                {entities.classes.map((id) => (
                  <li key={id}>
                    <ClassLink id={id} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {entities.bosses.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Chefes</h3>
              <ul className="wiki-columns">
                {entities.bosses.map((name) => (
                  <li key={bossAnchor(name)}>
                    <BossLink name={name} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {entities.families.length > 0 && (
            <>
              <h3 className="title wiki-home__subgroup">Monstros</h3>
              <ul className="wiki-columns">
                {entities.families.map((name) => (
                  <li key={name}>
                    <FamilyLink name={name} />
                  </li>
                ))}
              </ul>
            </>
          )}
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
