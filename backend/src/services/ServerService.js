const Service = require("./Service");
const database = require("../models");
const { MinecraftUtils } = require("../utils");

const minecraftUtils = new MinecraftUtils();

class ServerService extends Service {
  constructor() {
    super("Server");
  }
  
    async findAll() {
      const result = await database[this.modelName].findAll();
      
      const servers = await Promise.all(result.map(async (server) => {
        const serverData = await minecraftUtils.getServerData(server.ip);

        server = {
          id: server.id,
          internalName: server.internalName,
          name: server.name,
          ip: server.ip,
          image: server.image,
          video: server.video,
          status: serverData.debug.ping ? "Online" : "Offline",
          players: serverData.players?.online || 0,
          maxPlayers: serverData.players?.max || 0,
        }

        return server;
      }));

      await Promise.all(servers);
      return servers;
    }

    async findByInternalName(internalName) {
      const result = await database[this.modelName].findOne({
        where: { internalName: internalName },
      });

      if (!result) {
        throw new Error("Server not found");
      }

      return result;
    }
}

module.exports = ServerService;
