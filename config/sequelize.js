/* eslint-disable no-console */
/* eslint-disable no-debugger */
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const models = require('@models');

dotenv.config();

const {
    DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    // eslint-disable-next-line no-console
    logging: console.log,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
        },
    },
});

models.UserModel.init(sequelize);
models.UserModel.associate();

models.UserCode.init(sequelize);
models.UserCode.associate();

models.ApplicationModel.init(sequelize);
models.ApplicationModel.associate();

models.ReleaseModel.init(sequelize);
models.ReleaseModel.associate();

models.ApplicationPackageModel.init(sequelize);
models.ApplicationPackageModel.associate();

models.PlatformModel.init(sequelize);
models.PlatformModel.associate(sequelize);
// (async () => {
//     try {
//         debugger;
//         // await sequelize.sync();
//         await sequelize.sync({ force: true });
//         // eslint-disable-next-line no-console
//         console.log('Model synced successfully');
//         debugger;
//     } catch (error) {
//         console.log(error);
//     }
// })();

module.exports = {
    sequelize,
};
