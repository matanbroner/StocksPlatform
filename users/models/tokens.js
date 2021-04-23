'use strict';

/*
 * Using a Table like this to keep track of invalid JWTs whe users log out
 * kind of ignores the stateless aspect of using JWTs because we are storing states.
 * But this makes sense and is more secure than having low token expiration times.
*/

module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
/*    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },*/
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, { });
  Tokens.associate = function(models) {

  };
  return Tokens;
};
