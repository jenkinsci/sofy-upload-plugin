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

const {
  Company,
} = require('./Company.model');

const {
  UserRole,
} = require('./UserRole.model');

const {
  TeamRole,
} = require('./TeamRole.model');

const {
  VerificationCode,
} = require('./VerificationCode.model');

const {
  UserMarketing,
} = require('./UserMarketing.model');

const associateAll = () => {
  associateRelease();
  associateApplication();
  associatePlatform();
};

// setTimeout(async () => {
//   debugger;
//   try {
//     associateAll();
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
  Company,
  UserRole,
  TeamRole,
  VerificationCode,
  UserMarketing,
  associateAll,
};
