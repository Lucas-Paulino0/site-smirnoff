import { data } from "react-router";
import WikiArticle from "~/screens/Wiki/WikiArticle";
import { seo } from "~/config/seo";
import { WIKI_ARTICLES } from "~/data/wiki";
import type { Route } from "./+types/wiki_article";

export function loader({ params }: Route.LoaderArgs) {
  if (!WIKI_ARTICLES[params.slug]) {
    throw data("Artigo não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params, location }: Route.MetaArgs) {
  const article = WIKI_ARTICLES[params.slug];
  if (!article) return seo({ title: "Wiki", path: location.pathname });
  return seo({
    title: `${article.title} · Wiki`,
    description: article.summary,
    path: location.pathname,
  });
}

export default function WikiArticleRoute({ loaderData }: Route.ComponentProps) {
  return <WikiArticle article={WIKI_ARTICLES[loaderData.slug]} />;
}
