const db = require('../models');

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

    const reduceArticlesCount = Math.round(
      countEditions.reduce((acc, curr) => (
        acc + Number(curr.articles_count)
      ), 0) / countEditions.length
    );

    const data = countEditions.filter(editionItem => (
      editionItem.articles_count >= reduceArticlesCount
    ));

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
