require("./config/db-connect");

var express = require('express');
var app = express();
require('./Startup/routes')(app);

app.listen(8000, function() {
  console.log('SOFY-NODE SERVER IS UP AND RUNNING...');
});