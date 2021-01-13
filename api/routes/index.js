const articleRoutes = require('./articles');
const authorRoutes = require('./authors');
const editionRoutes = require('./editions');

function routes(app) {
  app.use('/api', articleRoutes);
  app.use('/api', authorRoutes);
  app.use('/api', editionRoutes);
}

module.exports = { routes };
