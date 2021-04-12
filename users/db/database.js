/* 
 * This file uses sequelize to establish a connection to our postgres database.
 * We provide our environment information and database information.
 *
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'postgres',
    'stocks_admin',
    'stocks_admin',
    {
       host: 'postgres',
       dialect: 'postgres',
    });

sequelize.authenticate()
    .then(() => console.log('Postgres successfully setup'))
    .catch((err) => console.log(err));

module.exports = sequelize;
