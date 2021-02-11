const Connection = require("tedious").Connection;

const config = {
  server: process.env.DB_HOST,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
  options: {
    port: 1433,
    database: process.env.DB_NAME,
  },
};

const connect = () => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on("connect", function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Database connected successfully!");
        resolve();
      }
    });

    connection.connect();
  });
};

module.exports = connect;
