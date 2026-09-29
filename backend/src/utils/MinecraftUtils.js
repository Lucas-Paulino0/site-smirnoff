const axios = require("axios");

class MinecraftUtils {
  async getServerData(ip) {
    const response = await axios.get(`https://api.mcsrvstat.us/3/${ip}`, {
      timeout: 10000,
    });
    return response.data;
  }
}

module.exports = MinecraftUtils;
