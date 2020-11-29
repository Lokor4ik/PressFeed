module.exports = (sequelize, Sequelize) => {
  const Articles = sequelize.define('articles', {
    title: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    published_at: {
      type: Sequelize.DATE
    },
    edition_title: {
      type: Sequelize.STRING
    }
  });

  return Articles;
};
