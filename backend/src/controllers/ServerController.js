const { ServerService } = require("../services");
const serverService = new ServerService();

class ServerController {
  static async getServers(req, res) {
    try {
      const servers = await serverService.findAll();

      return res.status(200).json(servers);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }

  static async getServer(req, res) {
    try {
      const server = await serverService.findByInternalName(req.params.name);

      return res.status(200).json(server);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
}
module.exports = ServerController;
