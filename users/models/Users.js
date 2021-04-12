/*
 * This is our Users table.
 * We define key attributes of a user: username, password, email.
 * We also define each constraint for each attribute.
*/

const Sequelize = require('sequelize');
const database = require('../db/database');

const Users = database.define('Users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Users;
