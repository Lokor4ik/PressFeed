const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
const articleModel = require('./Articles');
const authorModel = require('./Authors');
const editionModel = require('./Editions');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
});

const db = {
  Sequelize,
  sequelize,
  articles: articleModel(sequelize, Sequelize),
  authors: authorModel(sequelize, Sequelize),
  editions: editionModel(sequelize, Sequelize)
};

db.authors.belongsToMany(db.articles, {
  through: 'author_article',
  as: 'articles',
  foreignKey: 'author_id'
});

db.articles.belongsToMany(db.authors, {
  through: 'author_article',
  as: 'authors',
  foreignKey: 'article_id'
});

db.editions.hasMany(db.articles, {
  foreignKey: 'edition_id'
});

db.articles.belongsTo(db.editions, {
  foreignKey: 'edition_id'
});

module.exports = db;
