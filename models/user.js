'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    picture: DataTypes.STRING,
    password: DataTypes.STRING,
    favoriteGame: DataTypes.STRING,
    favoriteArt: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};