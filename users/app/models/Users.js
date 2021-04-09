const Sequelize = require('sequelize');
const database = require('../db/database');

const Users = database.define('Users', {
    userName: {
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
        unique: true
    }
});
/*
const Stocks = database.define('Stocks', {
    stockName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});
*/

module.exports = Users;
    //Stocks: Stocks,
    //UserStocks: UserStocks,
