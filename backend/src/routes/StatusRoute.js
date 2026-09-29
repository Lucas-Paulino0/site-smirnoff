const { Router } = require("express");
const StatusController = require("../controllers/StatusController");

const router = new Router();

router.get("/status", StatusController.getStatus);

module.exports = router;
