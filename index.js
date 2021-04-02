const express = require("express");
const cors = require("cors");
const db = require("./config/db");

(async () => {
  require("dotenv").config();

  db.connect();

  const app = express();

  require("./config/passport")(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(require("./routes"));

  app.use(function (err, req, res, next) {
    console.error(err);
    const { message, stack } = err;
    res.status(500).json({
      message: "Something went wrong!",
      error: message,
      stack,
    });
  });

  app.listen(8000, function () {
    console.log("Sofy server is up and running on port 8000");
  });
})();
