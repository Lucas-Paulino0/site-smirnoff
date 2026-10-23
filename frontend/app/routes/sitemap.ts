import { SITE } from "~/config/site";
import { publicPaths } from "~/data/sitePages";

// /sitemap.xml: a lista de páginas para o Google
export function loader() {
  const urls = publicPaths()
    .map((path) => `  <url><loc>${SITE.url}${path}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
