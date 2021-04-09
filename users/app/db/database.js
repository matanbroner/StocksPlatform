const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: 'pgsql_db',
        port: 5432,
        dialect: 'postgres',
        type: 'postgres',
        synchronize: true
    });


module.exports = sequelize;
