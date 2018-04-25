'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssetType = sequelize.define(
    'AssetType',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  AssetType.associate = function(models) {
    // associations can be defined here
  };
  return AssetType;
};
