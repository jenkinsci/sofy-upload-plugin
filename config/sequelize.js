const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const models = require('@models');

dotenv.config();

const {
    DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    logging: console.log,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
        },
    },
});

models.UserModel.init(sequelize);

// (async () => {
//     try {
//         // await sequelize.sync();
//         debugger;
//         await sequelize.sync({ force: true });
//         console.log('Model synced successfully');
//         debugger;
//     } catch (error) {
//         console.log(error);
//         debugger;
//     }
// })();

module.exports = {
    sequelize,
};
