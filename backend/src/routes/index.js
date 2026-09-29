const status = require("./StatusRoute");
const categories = require("./CategoryRoute");
const products = require("./ProductRoute");
const purchases = require("./PurchaseRoute");

module.exports = (app) => {
  app.use(status);
  app.use(categories);
  app.use(products);
  app.use(purchases);
};
