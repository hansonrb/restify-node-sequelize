'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asset = sequelize.define(
    'Asset',
    {
      name: DataTypes.STRING,
      assetTypeId: DataTypes.INTEGER,
    },
    {},
  );
  Asset.associate = function(models) {
    // associations can be defined here
  };
  return Asset;
};
