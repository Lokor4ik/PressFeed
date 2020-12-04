const db = require('../models');
const { getPagination } = require('../utils/helpers');

const {
  authors: Author,
  articles: Article
} = db;

exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page - 1, size);

  try {
    const data = await Article.findAndCountAll({
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
      offset,
      order: [['id', 'ASC']],
      distinct: true
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
    const data = await Article.findOne({
      where: {
        id
      },
      include: [
        {
          model: Author,
          as: 'authors',
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
