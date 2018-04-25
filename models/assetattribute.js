'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssetAttribute = sequelize.define(
    'AssetAttribute',
    {
      assetId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {},
  );
  AssetAttribute.associate = function(models) {};
  return AssetAttribute;
};
