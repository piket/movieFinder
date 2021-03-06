"use strict";
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define("tag", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.tag.hasMany(models.favorite);
      }
    }
  });
  return tag;
};