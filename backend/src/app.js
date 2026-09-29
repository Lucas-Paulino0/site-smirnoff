const path = require("path");
const express = require("express");
const routes = require("./routes");
var cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors())
app.use("/files", express.static(path.join(__dirname, "files")));

routes(app);

module.exports = app;
