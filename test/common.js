require('module-alias/register');

const should = require('should');

const mssqlServer = require('./docker/mssql-server');

should();

before(async function () {
    await mssqlServer.start();
});
