const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const { npm_config_authors: strAuthors } = process.env;
      const numAuthors = parseInt(strAuthors, 10);
      const [dbAuthors] = await queryInterface.sequelize.query(
        ` SELECT  id 
          FROM    authors`
      );

      // if attribute is not entered
      if (!strAuthors) {
        throw new Error('Need to enter a parameter: --authors=positive-number');
      }

      // if the DB does not contain at least 3 authors
      // and at this time the attribute is less than 3 characters
      if (dbAuthors.length < 3 && (numAuthors < 3 || !numAuthors)) {
        throw new Error('There must be at least 3 authors in the database');
      }

      // if DB are more than or equals 3 authors but the attribute is not entered
      if (!numAuthors) {
        await transaction.rollback();
        return;
      }

      const authors = Array.from(
        { length: numAuthors },
        () => ({
          name: faker.name.findName()
        })
      );

      await queryInterface.bulkInsert('authors', authors, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('authors', null, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
