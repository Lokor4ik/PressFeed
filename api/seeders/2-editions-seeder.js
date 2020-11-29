const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const { npm_config_editions: strEditions } = process.env;
      const numEditions = parseInt(strEditions, 10);
      const [dbEditions] = await queryInterface.sequelize.query(
        ` SELECT  id 
          FROM    editions`
      );

      // if attribute is not entered
      if (!strEditions) {
        throw new Error('Need to enter a parameter: --editions=positive-number');
      }

      // if the DB does not contain at least 1 edition
      // and at this time the attribute is less than 1 characters
      if (dbEditions.length < 1 && (numEditions < 1 || !numEditions)) {
        throw new Error('There must be at least 1 editions in the database');
      }

      if (!numEditions) {
        await transaction.rollback();
        return;
      }

      const authors = Array.from(
        { length: numEditions },
        () => ({
          title: faker.name.title()
        })
      );
      await queryInterface.bulkInsert('editions', authors, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('editions', null, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
