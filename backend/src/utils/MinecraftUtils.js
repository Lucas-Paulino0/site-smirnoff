const axios = require("axios");

class MinecraftUtils {
  async getServerData(ip) {
    const response = await axios.get(`https://api.mcsrvstat.us/3/${ip}`, {
      timeout: 10000,
    });
    return response.data;
  }

  // UUID da conta original com esse nick, ou null se o nick não é de conta
  // original. Erros da Mojang (fora do ar, limite de requisições) sobem.
  async getPlayerUuid(nick) {
    const response = await axios.get(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(nick)}`,
      { timeout: 5000, validateStatus: (status) => [200, 204, 404].includes(status) }
    );
    return response.status === 200 ? response.data.id : null;
  }
}

module.exports = MinecraftUtils;
