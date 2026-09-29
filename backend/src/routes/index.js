const servers = require("./ServerRoute");
const categories = require("./CategoryRoute");
const products = require("./ProductRoute");
const purchases = require("./PurchaseRoute");

module.exports = (app) => {
  app.use(servers);
  app.use(categories);
  app.use(products);
  app.use(purchases);
};
