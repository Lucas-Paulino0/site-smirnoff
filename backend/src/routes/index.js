const status = require("./StatusRoute");
const categories = require("./CategoryRoute");
const products = require("./ProductRoute");
const purchases = require("./PurchaseRoute");
const players = require("./PlayerRoute");

module.exports = (app) => {
  app.use(status);
  app.use(categories);
  app.use(products);
  app.use(purchases);
  app.use(players);
};
