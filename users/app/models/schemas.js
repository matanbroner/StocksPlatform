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

const UserStocks = database.define('UserStocks', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'userName'
        },
    },
    stockName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Stocks,
            key: 'stockName'
        },
    }
});

module.exports = {
    Users: Users,
    Stocks: Stocks,
    UserStocks: UserStocks,
}