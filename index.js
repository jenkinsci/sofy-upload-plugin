const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./config/db');
const passport = require('./config/passport');
const routes = require('./routes');

(async () => {
  dotenv.config();
  await db.connect();

  const app = express();
  passport(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(routes);

  app.use((err, req, res) => {
    console.error(err);
    const { message, stack } = err;
    res.status(500).json({
      message: 'Something went wrong!',
      error: message,
      stack,
    });
  });

  app.listen(8000, () => console.log('Sofy server is up and running on port 8000'));
})();
