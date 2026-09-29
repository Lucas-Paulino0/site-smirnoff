const { StatusService } = require("../services");
const statusService = new StatusService();

class StatusController {
  static async getStatus(req, res) {
    const status = await statusService.getStatus();
    return res.status(200).json(status);
  }
}
module.exports = StatusController;
