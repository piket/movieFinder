"use strict";
module.exports = function(sequelize, DataTypes) {
  var favoritestags = sequelize.define("favoritestags", {
    favoriteId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favoritestags;
};