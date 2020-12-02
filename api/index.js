require('dotenv').config();

const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');
const editionRoutes = require('./routes/editions');
const db = require('./models');

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(articleRoutes);
app.use(authorRoutes);
app.use(editionRoutes);

db.sequelize.sync();

if (require.main === module) {
  const port = process.env.SERVER_PORT || 5000;

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
