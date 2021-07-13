const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
    DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    logging: console.log,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
        },
    },
});

module.exports = {
    sequelize,
};
