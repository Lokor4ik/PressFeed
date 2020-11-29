module.exports = (sequelize, Sequelize) => {
  const Newspapers = sequelize.define('editions', {
    title: {
      type: Sequelize.STRING
    }
  });

  return Newspapers;
};
