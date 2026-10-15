const { MinecraftUtils } = require("../utils");

const minecraftUtils = new MinecraftUtils();

// Um nick só muda de dono depois de semanas; nick sem conta original pode
// virar conta a qualquer hora, então fica menos tempo guardado.
const FOUND_MS = 24 * 60 * 60 * 1000;
const NOT_FOUND_MS = 60 * 60 * 1000;
// Teto de memória: quem digitar nicks aleatórios não enche o servidor
const MAX_ENTRIES = 5000;

class PlayerService {
  constructor() {
    this.cache = new Map();
  }

  async getUuid(nick) {
    const key = nick.toLowerCase();
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.uuid;
    }

    const uuid = await minecraftUtils.getPlayerUuid(nick);

    this.cache.delete(key);
    if (this.cache.size >= MAX_ENTRIES) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, {
      uuid,
      expiresAt: Date.now() + (uuid ? FOUND_MS : NOT_FOUND_MS),
    });
    return uuid;
  }
}

module.exports = PlayerService;
