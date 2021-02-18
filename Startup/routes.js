const express = require("express");

//Define routes
var GetUserInfo = require('../routes/GetUserInfo');

//export routes
module.exports = function(app){
    app.use(express.json());
    app.use('/GetUserInfo', GetUserInfo);
};