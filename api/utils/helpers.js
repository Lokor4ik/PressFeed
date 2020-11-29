const moment = require('moment');

function randomInteger(min = 1, max = 3) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getUniqueRandomNumber(min, max, usedIndexes) {
  const rand = randomInteger(min, max);
  if (usedIndexes.has(rand)) {
    return getUniqueRandomNumber(min, max, usedIndexes);
  }

  usedIndexes.add(rand);
  return rand;
}

function monthRange(dateFrom, dateTo) {
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
}

module.exports = {
  randomInteger,
  getUniqueRandomNumber,
  monthRange
};
