require('dotenv/config');
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

const db = new sql.ConnectionPool(config);

const connect = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database Connection Failed', error);
  }
};

module.exports = {
  db,
  connect,
};
