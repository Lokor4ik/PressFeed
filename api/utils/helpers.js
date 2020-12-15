const moment = require('moment');

const randomInteger = (min = 1, max = 3) => (
  Math.floor(min + Math.random() * (max + 1 - min))
);

const getUniqueRandomNumber = (min, max, usedIndexes) => {
  const rand = randomInteger(min, max);

  if (usedIndexes.has(rand)) {
    return getUniqueRandomNumber(min, max, usedIndexes);
  }

  usedIndexes.add(rand);
  return rand;
};

const monthRange = (dateFrom, dateTo) => {
  const startDate = moment(dateFrom);
  const endDate = moment(dateTo);

  const result = [];

  while (startDate.isBefore(endDate)) {
    result.push(startDate.format('YYYY-MM'));
    startDate.add(1, 'month');
  }

  if (moment(result[result.length - 1]).format('M') !== endDate.format('M')) {
    result.push(endDate.format('YYYY-MM'));
  }

  return result;
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const calculateAvarageArticles = (editions) => Math.round(
  editions.reduce((acc, curr) => (
    acc + Number(curr.articles_count)
  ), 0) / editions.length
);

module.exports = {
  randomInteger,
  getUniqueRandomNumber,
  monthRange,
  getPagination,
  calculateAvarageArticles
};
