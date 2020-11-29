const db = require('../models');

const {
  authors: Author,
  articles: Article
} = db;

exports.findAll = async (req, res) => {
  try {
    const data = await Article.findAll({
      include: [
        {
          model: Author,
          as: 'authors',
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
