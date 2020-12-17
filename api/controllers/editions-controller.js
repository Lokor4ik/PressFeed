const db = require('../models');
const { calculateAvarageArticles } = require('../utils/helpers');

const {
  editions: Edition,
  articles: Article,
  authors: Author
} = db;

exports.findAll = async (req, res) => {
  try {
    /* const editions = await Edition.findAll({
      include: [
        {
          model: Article,
          as: 'articles'
        }
      ]
    }); */

    /* const avarageArticlesCount = calculateAvarageArticles(editions);

    const data = editions.filter(editionItem => (
      editionItem.articles_count >= avarageArticlesCount
    )); */

    const editions = await db.sequelize.query(`
      SELECT      e.title, e.id, ar.published_at, ar.title as ar_title, COUNT(au.id) as au_count
      FROM        editions e
      INNER JOIN  articles  ar
        ON      ar.edition_id = e.id
      INNER JOIN author_article aa 
        ON ar.id = aa.article_id
      INNER JOIN authors au 
        ON aa.author_id = au.id
      GROUP BY    e.id, e.title, ar.published_at, ar_title
    `);

    res.send(editions[0]);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
/*
[db.sequelize.literal(`(
        SELECT COUNT (articles.id)
        FROM          articles
        WHERE articles.edition_id = editions.id
        AND (
          SELECT COUNT (author_article.article_id)
          FROM          author_article
          WHERE author_article.article_id = articles.id
          ) > 1
        )`), 'articles_count']
*/
