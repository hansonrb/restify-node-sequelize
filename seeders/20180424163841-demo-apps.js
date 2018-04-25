'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Apps',
      [
        {
          token: 'FIRST_APP_TOKEN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          token: 'SECOND_APP_TOKEN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Apps', null, {});
  },
};
