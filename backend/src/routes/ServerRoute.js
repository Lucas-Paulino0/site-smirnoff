const { Router } = require("express");
const ServerController = require("../controllers/ServerController");

const router = new Router();

router.get("/servers", ServerController.getServers);
router.get("/servers/:name", ServerController.getServer);

module.exports = router;
