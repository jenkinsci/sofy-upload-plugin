const express = require('express');
const cors = require('cors');
const passport = require('passport');

(async() => {
  require('dotenv').config();

  await require("./config/db-connect")();

  var app = express();

  require('./config/passport')(passport);

  app.use(passport.initialize());

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());

  app.use(require('./routes'));

  require('./Startup/routes')(app);

  app.listen(8000, function() {
    console.log('SOFY-NODE SERVER IS UP AND RUNNING...');
  });
})()