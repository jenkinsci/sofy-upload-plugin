require("dotenv/config");
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    "encrypt": true,
    "enableArithAbort": true
  }
};

const db = new sql.ConnectionPool(config);

const connect = async () => {
  await db.connect().then(() => {
    console.log('Connected TO MSSQL')
  }).catch(err => {
    console.log('Database Connection Failed!', err)
  });
};

module.exports = {
  db,
  connect
};
