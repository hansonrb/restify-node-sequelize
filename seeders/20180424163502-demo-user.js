'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Test',
          lastname: 'User',
          email: 'test.user@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
