"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    imdbid: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.hasMany(models.tag);
        models.favorite.hasMany(models.comment);
      }
    }
  });
  return favorite;
};