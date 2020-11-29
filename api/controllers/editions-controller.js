const db = require('../models');

const {
  authors: Author,
  articles: Article,
  editions: Edition
} = db;

exports.findAll = async (req, res) => {
  try {
    const data = await Edition.findAll({
      include: [
        {
          model: Article,
          as: 'articles',
          attributes: ['id', 'title', 'body', [db.sequelize.fn('COUNT', 'authors.id'), 'commentsCounter']],

          include: [
            {
              model: Author,
              as: 'authors',
              attributes: ['id'],
              through: {
                attributes: []
              },
              group: ['authors.id'],
            }
          ],
          group: ['editions.id', 'articles.id', 'authors.id'],
        }
      ],
      group: ['editions.id', 'articles.id', 'authors.id'],
    });

    const newData = await db.sequelize.query(`
          SELECT  ed.id
          FROM    editions as ed
          WHERE  EXISTS
          ( 
            SELECT art.id,art.title,art.body
FROM articles as art
WHERE 
(
  array_length(array(SELECT author_article.author_id FROM 
  author_article WHERE author_article.article_id = art.id), 1) > 2
)
  AND art.edition_id = ed.id
          )
    `);

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
