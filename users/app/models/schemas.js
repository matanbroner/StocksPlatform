const Sequelize = require('sequelize');
const database = require('../db/database');

const Users = database.define('Users', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Stocks = database.define('Stocks', {
    stockName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

const UserStocks = database.define('UserStocks', {
    stockName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

module.exports = {
    Users: Users,
    Stocks: Stocks,
    UserStocks: UserStocks,
}