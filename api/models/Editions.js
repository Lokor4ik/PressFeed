module.exports = (sequelize, Sequelize) => {
  const Editions = sequelize.define('editions', {
    title: {
      type: Sequelize.STRING
    }
  });

  return Editions;
};
