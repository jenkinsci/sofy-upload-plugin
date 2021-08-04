require('dotenv/config');
const sql = require('mssql');

const { DB } = require('../lib/config');

const config = {
    user: DB.USER,
    password: DB.PASS,
    server: DB.HOST,
    database: DB.NAME,
    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

const db = new sql.ConnectionPool(config);

const connect = async () => {
    try {
        await db.connect();
        // eslint-disable-next-line no-console
        console.log('Database connected successfully');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Database Connection Failed', error);
    }
};

module.exports = {
    db,
    connect,
};
