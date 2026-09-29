const { MinecraftUtils } = require("../utils");

const minecraftUtils = new MinecraftUtils();

// mcsrvstat.us already caches for about a minute; caching here too keeps
// the site from hammering it when many visitors open the page at once.
const CACHE_MS = 60 * 1000;

class StatusService {
  constructor() {
    this.cache = null;
    this.cachedAt = 0;
  }

  async getStatus() {
    if (this.cache && Date.now() - this.cachedAt < CACHE_MS) {
      return this.cache;
    }

    const ip = process.env.MC_SERVER_IP;
    let status = { ip, online: false, players: 0, maxPlayers: 0 };

    try {
      const data = await minecraftUtils.getServerData(ip);
      status = {
        ip,
        online: Boolean(data.online),
        players: data.players?.online || 0,
        maxPlayers: data.players?.max || 0,
      };
    } catch (error) {
      console.error("Failed to fetch server status:", error.message);
    }

    this.cache = status;
    this.cachedAt = Date.now();
    return status;
  }
}

module.exports = StatusService;
