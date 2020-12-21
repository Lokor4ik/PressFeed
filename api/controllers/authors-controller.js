const { Op } = require('sequelize');
const moment = require('moment');

const db = require('../models');
const { monthRange } = require('../utils/helpers');

const {
  authors: Author,
  articles: Article
} = db;

exports.defineALlMonths = async (req, res) => {
  const { startDate, endDate } = req.body;

  const firstMonth = moment(startDate);
  const lastMonth = moment(endDate);

  try {
    const { published_at: earlisetArticle } = await Article.findOne({
      where: {
        published_at: {
          [Op.gte]: firstMonth
        }
      },
      attributes: ['published_at'],
      order: [['published_at', 'asc']]
    });

    const { published_at: lastArticle } = await Article.findOne({
      where: {
        published_at: {
          [Op.lte]: lastMonth
        }
      },
      attributes: ['published_at'],
      order: [['published_at', 'desc']]
    });

    const allMonths = monthRange(earlisetArticle, lastArticle);

    res.send(allMonths);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving all months'
    });
  }
};

exports.findAll = async (req, res) => {
  const { month } = req.body;

  const startOfMonth = moment(month);
  const endOfMonth = moment(month).endOf('month').endOf('day');
  try {
    const authors = await Author.findAll({
      attributes: ['id', 'name', [db.sequelize.fn('count', db.sequelize.col('articles.id')), 'articles_count']],
      include: [
        {
          model: Article,
          as: 'articles',
          attributes: [],
          where: {
            published_at: {
              [Op.between]: [startOfMonth, endOfMonth]
            }
          },
          through: {
            attributes: []
          }
        }
      ],
      group: ['authors.id'],
      order: [
        [[db.sequelize.literal('articles_count DESC')]]
      ],
      limit: 3,
      subQuery: false
    });

    res.send(authors);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving authors'
    });
  }
};
