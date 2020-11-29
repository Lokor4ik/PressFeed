const faker = require('faker');
const { randomInteger } = require('../utils/helpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const { npm_config_articles: strArticles } = process.env;
      const numArticles = parseInt(strArticles, 10);
      const [dbEditions] = await queryInterface.sequelize.query(
        ` SELECT  id, title
          FROM    editions`
      );

      // if attribute is not entered
      if (!strArticles) {
        throw new Error('Need to enter a parameter: --articles=positive-number');
      }

      // if the attribute is less than 1 characters
      if (numArticles < 1 || !numArticles) {
        throw new Error('The attribute must have at least 1 article');
      }

      // if DB are more than or equals 3 articles but the attribute is not entered
      if (!numArticles) {
        await transaction.rollback();
        return;
      }

      const adjustedDate = new Date('2019', '01', '01');
      const dateNow = new Date();

      const articles = Array.from(
        { length: numArticles },
        () => {
          const randomEdition = randomInteger(0, dbEditions.length - 1);

          return {
            title: faker.commerce.productName(),
            body: faker.commerce.productDescription(),
            published_at: faker.date.between(adjustedDate, dateNow),
            edition_id: dbEditions[randomEdition].id,
            edition_title: dbEditions[randomEdition].title
          };
        }
      );
      await queryInterface.bulkInsert('articles', articles, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('articles', null, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
