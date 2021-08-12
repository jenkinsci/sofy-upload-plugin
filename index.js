require('module-alias/register');
require('dotenv').config();

const ExpressServer = require('./lib/app');
const config = require('./lib/config');

new ExpressServer(config).setup();
