require('dotenv/config')
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 1433,
};

const poolPromise = new sql.ConnectionPool(config);
const pool = poolPromise.connect().then(() =>{
  console.log('Connected TO MSSQL...')
})
.catch(err => console.log('Database Connection Failed! Bad Config:', err))

module.exports = {
  sql, poolPromise
}
