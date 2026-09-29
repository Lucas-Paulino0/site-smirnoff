const axios = require("axios");

class MinecraftUtils {
  async getServerData(ip) {
    const response = await axios
      .get(`https://api.mcsrvstat.us/3/${ip}`)
      .catch(function (error) {
        if (error.response) {
          throw error.response.data;
        }
      });
    return response.data;
  }
}

module.exports = MinecraftUtils;
