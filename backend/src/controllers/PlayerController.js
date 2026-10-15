const { PlayerService } = require("../services");
const playerService = new PlayerService();

const MINECRAFT_USERNAME = /^[A-Za-z0-9_]{3,16}$/;

class PlayerController {
  // O site mostra a skin pelo UUID: o mc-heads.net às vezes guarda uma busca
  // por nick que falhou e passa horas mostrando o Steve no lugar da skin.
  static async getPlayer(req, res) {
    const { nick } = req.params;
    if (!MINECRAFT_USERNAME.test(nick)) {
      return res.status(400).json({ error: "Invalid nick" });
    }

    try {
      const uuid = await playerService.getUuid(nick);
      if (!uuid) {
        return res.status(404).json({ error: "Player not found" });
      }
      return res.status(200).json({ uuid });
    } catch (error) {
      console.error("Erro ao buscar o jogador na Mojang:", error.message);
      return res.status(502).json({ error: "Mojang unavailable" });
    }
  }
}
module.exports = PlayerController;
