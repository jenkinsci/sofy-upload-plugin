const compose = require('docker-compose');

async function start() {
    await compose.upOne('mssql-server', { cwd: __dirname });
    await compose.exec('mssql-server', 'sh setup.sh').catch(function () {});
}

module.exports = { start };
