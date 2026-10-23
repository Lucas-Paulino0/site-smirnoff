export const SITE = {
  name: "Hail",
  // endereço público, para os links de prévia e o sitemap
  url: (process.env.PUBLIC_SITE_URL || "https://hail.halahost.net").replace(/\/$/, ""),
  tagline: "Servidor de Minecraft RPG",
  serverIp: process.env.PUBLIC_SERVER_IP || "server1.halahost.net",
  minecraftVersion: "Java 26.1.2",
  discordUrl: process.env.PUBLIC_DISCORD_URL || "",
  // Servidor em fase fechada: só entra quem está na whitelist
  whitelist: true,
};

export const pageTitle = (page?: string) =>
  page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
