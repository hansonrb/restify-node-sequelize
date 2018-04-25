'use strict';
module.exports = (sequelize, DataTypes) => {
  var Allocation = sequelize.define(
    'Allocation',
    {
      userId: DataTypes.INTEGER,
      assetId: DataTypes.INTEGER,
      endAt: DataTypes.DATE,
    },
    {},
  );
  Allocation.associate = function(models) {
    // associations can be defined here
  };
  return Allocation;
};
