const sql = require("mssql");

const connect = async () => {
  try {
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
    await sql.connect({
      user: DB_USER,
      password: DB_PASS,
      server: DB_HOST,
      database: DB_NAME,
      pool: {
        max: 10,
        min: 0,
      },
    });
    console.log("Connected to DB successfully");
  } catch (err) {
    console.error("Error while connection to DB");
  }
};

module.exports = {
  connect,
};
