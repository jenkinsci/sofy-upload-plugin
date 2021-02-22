const express = require('express');
const cors = require('cors');
const db = require("./config/db");

(async() => {
  require('dotenv').config();

  await db.connect();

  const app = express();

  require('./config/passport')(app);

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());

  app.use(require('./routes'));

  app.listen(8000, function() {
    console.log('Sofy server is up and running');
  });
})()