'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'AssetTypes',
      [
        {
          name: 'Cash',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Inventory',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vehicle',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Machinary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AssetTypes', null, {});
  },
};
