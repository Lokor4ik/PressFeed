const db = require('../models');
const { getPagination } = require('../utils/helpers');

const {
  authors: Author,
  articles: Article
} = db;

exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

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
      ],
      limit,
      offset
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Article.findByPk(id);

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
