'use strict';

module.exports = (sequelize, DataTypes) => {
  const OAuths = sequelize.define('OAuths', {
    id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  }, { });
  OAuths.associate = function(models) {

  };
  return OAuths;
};
