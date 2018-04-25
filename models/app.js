'use strict';
module.exports = (sequelize, DataTypes) => {
  var App = sequelize.define(
    'App',
    {
      token: DataTypes.STRING,
    },
    {},
  );
  App.associate = function(models) {
    // associations can be defined here
  };
  return App;
};
