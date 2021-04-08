const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        //host: process.env.PGHOST,
        host: 'pgsql_db',
        port: 5432,
        dialect: 'postgres',
        type: 'postgres',
        synchronize: true
    });


//const sequelize = new Sequelize('postgres://admin:123456@pgsql_db:5432/StockPlatform');
module.exports = sequelize;
