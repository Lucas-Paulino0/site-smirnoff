const { Router } = require("express");
const PlayerController = require("../controllers/PlayerController");

const router = new Router();

router.get("/players/:nick", PlayerController.getPlayer);

module.exports = router;
