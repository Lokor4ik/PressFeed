module.exports = (sequelize, Sequelize) => {
  const Months = sequelize.define('months', {
    date: {
      type: Sequelize.DATE
    }
  });

  return Months;
};
