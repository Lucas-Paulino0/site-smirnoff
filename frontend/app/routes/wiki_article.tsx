import { data } from "react-router";
import WikiArticle from "~/screens/Wiki/WikiArticle";
import { pageTitle } from "~/config/site";
import { WIKI_ARTICLES } from "~/data/wiki";
import type { Route } from "./+types/wiki_article";

export function loader({ params }: Route.LoaderArgs) {
  if (!WIKI_ARTICLES[params.slug]) {
    throw data("Artigo não encontrado", { status: 404 });
  }
  return { slug: params.slug };
}

export function meta({ params }: Route.MetaArgs) {
  const article = WIKI_ARTICLES[params.slug];
  if (!article) return [{ title: pageTitle("Wiki") }];
  return [
    { title: pageTitle(`${article.title} · Wiki`) },
    { name: "description", content: article.summary },
  ];
}

export default function WikiArticleRoute({ loaderData }: Route.ComponentProps) {
  return <WikiArticle article={WIKI_ARTICLES[loaderData.slug]} />;
}
