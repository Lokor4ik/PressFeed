const articleRoutes = require('./articles');
const authorRoutes = require('./authors');
const editionRoutes = require('./editions');

exports.routes = (app) => {
  app.use(articleRoutes);
  app.use(authorRoutes);
  app.use(editionRoutes);
}