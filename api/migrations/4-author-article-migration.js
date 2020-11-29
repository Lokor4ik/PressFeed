module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('author_article', {
        author_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'authors',
            key: 'id'
          }
        },
        article_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'articles',
            key: 'id'
          }
        }
      }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('author_article', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
