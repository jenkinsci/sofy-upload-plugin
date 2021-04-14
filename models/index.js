const { sequelize } = require('../config/sequelize');
const {
  Application,
  associate: associateApplication,
} = require('./Application.model');

const {
  Release,
  associate: associateRelease,
} = require('./Release.model');

const {
  Platform,
  associate: associatePlatform,
} = require('./Platform.model');

const associateAll = () => {
  associateRelease();
  associateApplication();
  associatePlatform();
};

// setTimeout(async () => {
//   debugger;
//   try {
//     associateAll();
//     // await syncAll({ alter: true });
//     await sequelize.sync({ });
//     await sequelize.sync({ alter: true });
//     await sequelize.sync({ force: true });
//     debugger;
//   } catch (error) {
//     debugger;
//   }
// }, 2000);

module.exports = {
  Application,
  Release,
  Platform,
  associateAll,
};
