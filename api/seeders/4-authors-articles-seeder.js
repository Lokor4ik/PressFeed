const { getUniqueRandomNumber, randomInteger } = require('../utils/helpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [authors] = await queryInterface.sequelize.query(
        ` SELECT  id
          FROM    authors`
      );

      const [intermediateArticlesId] = await queryInterface.sequelize.query(
        ` SELECT  id 
          FROM    articles
          WHERE   NOT EXISTS
          ( 
            SELECT  article_id
            FROM    author_article
            WHERE   article_id = id
          )`
      );

      // for each newly added new article_id, randomly assigned up to 3 authors
      const authorsArticles = intermediateArticlesId.map(item => {
        const usedIndexes = new Set();

        return Array.from(
          { length: randomInteger() },
          () => {
            const randomAuthor = getUniqueRandomNumber(1, authors.length, usedIndexes);

            return {
              author_id: authors[randomAuthor - 1].id,
              article_id: item.id
            };
          }
        );
      }).flat();

      await queryInterface.bulkInsert('author_article', authorsArticles, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('author_article', null, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
