const db = require('../models');
const { reduceArticlesCount } = require('../utils/helpers');

const {
  editions: Edition
} = db;

exports.findAll = async (req, res) => {
  try {
    const countEditions = await Edition.findAll({
      attributes: ['id', 'title', [db.sequelize.literal(`(
        SELECT COUNT (articles.id)
        FROM          articles
        WHERE articles.edition_id = editions.id
        AND (
          SELECT COUNT (author_article.article_id)
          FROM          author_article
          WHERE author_article.article_id = articles.id
          ) > 1
        )`), 'articles_count']],
      raw: true
    });

    const articlesCount = reduceArticlesCount(countEditions);

    const data = countEditions.filter(editionItem => (
      editionItem.articles_count >= articlesCount
    ));

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
