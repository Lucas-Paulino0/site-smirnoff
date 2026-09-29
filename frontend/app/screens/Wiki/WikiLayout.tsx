import { NavLink } from "react-router";
import { WIKI_ARTICLES, WIKI_CATEGORIES } from "~/data/wiki";
import "./Wiki.css";

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page wiki">
      <aside className="wiki__sidebar" aria-label="Artigos da wiki">
        <NavLink to="/wiki" end className="wiki__home-link">
          Wiki {"·"} Início
        </NavLink>
        {WIKI_CATEGORIES.map((category) => (
          <div key={category.title} className="wiki__group">
            <span className="wiki__group-title font-pixel">
              {category.title}
            </span>
            <ul>
              {category.articles.map((slug) => (
                <li key={slug}>
                  <NavLink
                    to={`/wiki/${slug}`}
                    className={({ isActive }) =>
                      `wiki__nav-link${isActive ? " wiki__nav-link--active" : ""}`
                    }
                  >
                    {WIKI_ARTICLES[slug].title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="wiki__content">{children}</div>
    </div>
  );
}
