const { Op } = require('sequelize');
const moment = require('moment');

const db = require('../models');
const { monthRange } = require('../utils/helpers');

const {
  authors: Author,
  articles: Article,
  months: Months
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

    const allMonths = monthRange(earlisetArticle, lastMonth);

    res.send(allMonths);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};

exports.findAll = async (req, res) => {
  const { month } = req.body;

  const startOfMonth = moment(month);
  const endOfMonth = moment(month).endOf('month').endOf('day');

  try {
    const authors = await Author.findAll({
      attributes: ['id', 'name', [db.sequelize.literal(`(SELECT COUNT(author_id) FROM author_article WHERE author_article.author_id = authors.id AND articles.published_at BETWEEN ${startOfMonth} AND ${endOfMonth})`), 'PostCount']],
      include: [
        {
          model: Article,
          as: 'articles',
          where: {
            published_at: {
              [Op.between]: [startOfMonth, endOfMonth]
            }
          },
          through: {
            attributes: []
          }
        }
      ]
    });

    res.send(authors);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
/*
 const now = new Date(endDate);
    const daysOfYear = [];
    for (let d = new Date(startDate); d <= now; d.setMonth(d.getMonth() + 1)) {
      const currentDate = new Date(d);

      const currentMonthAuthor = data.filter(authorItem => {
        const dateArticle = new Date(authorItem['articles.published_at']);

        if (dateArticle.getMonth() === currentDate.getMonth()) {
          return true;
        }

        return false;
      });
      daysOfYear.push(currentMonthAuthor);
    }
*/

/*
 const data = await Promise.all(allMonths.map(async (itemMonth, indexMonth) => {
      const monthAuthors = await Author.findAll({
        include: [
          {
            model: Article,
            as: 'articles',
            attributes: ['id', 'published_at'],
            where: {
              published_at: {
                [Op.between]: [itemMonth, allMonths[indexMonth + 1]]
              }
            },
            through: {
              attributes: []
            }
          }
        ],
        order: [
          [Article, 'published_at', 'asc']
        ]
      });

      return {
        month: itemMonth,
        monthAuthors
      };
    }));
*/

/*
  const monthCounter = new Date(firstMonth);
   const allMonths = Array.from(
     { length: diffMonths + 2 },
     (_, index) => {
       if (index === 0) {
         return firstMonth;
       }

       if (index === diffMonths + 1) {
         return lastMonth;
       }

       return new Date(monthCounter.setMonth(monthCounter.getMonth() + 1));
     }
   );
*/
