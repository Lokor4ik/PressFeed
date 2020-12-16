const db = require('../models');
const { calculateAvarageArticles } = require('../utils/helpers');

const {
  editions: Edition
} = db;

exports.findAll = async (req, res) => {
  try {
    const editions = await Edition.findAll({
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
      raw: true,
      order: [[db.sequelize.literal('articles_count DESC')]]
    });

    const avarageArticlesCount = calculateAvarageArticles(editions);

    const data = editions.filter(editionItem => (
      editionItem.articles_count >= avarageArticlesCount
    ));

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
