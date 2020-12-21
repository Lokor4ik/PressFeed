const db = require('../models');
const { calculateAvarageArticles } = require('../utils/helpers');

/* const {
  editions: Edition
} = db; */

exports.findAll = async (req, res) => {
  try {
    /* const editions = await Edition.findAll({
      attributes: ['id', 'title', [db.sequelize.literal(`(
        SELECT COUNT (articles.id)
        FROM          articles
        WHERE articles.edition_id = editions.id
        AND (
          SELECT COUNT (author_article.article_id)
          FROM          author_article
          WHERE author_article.article_id = articles.id
          ) > 1
        )`), 'articles_count']]
    }); */

    const [editions] = await db.sequelize.query(`
      SELECT     e.title, e.id, COUNT (ar.id) as articles_count
      FROM       editions e
      INNER JOIN articles ar
        ON       ar.edition_id = e.id
      WHERE (
        SELECT COUNT (aa.article_id)
        FROM          authors au
        INNER JOIN    author_article  aa
          ON          aa.author_id  = au.id
          AND         aa.article_id = ar.id
      ) > 1
      GROUP BY   e.id, e.title
      ORDER BY   articles_count DESC
    `);

    const avarageArticlesCount = calculateAvarageArticles(editions);

    const data = editions.filter(editionItem => (
      editionItem.articles_count >= avarageArticlesCount
    ));

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving editions'
    });
  }
};
