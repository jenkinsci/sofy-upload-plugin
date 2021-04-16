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
  associate: associateCompany,
} = require('./Company.model');

const {
  UserRole,
  associate: associateUserRole,
} = require('./UserRole.model');

const {
  TeamRole,
  associate: associateTeamRole,
} = require('./TeamRole.model');

const {
  VerificationCode,
  associate: associateVerificationCode,
} = require('./VerificationCode.model');

const {
  UserMarketing,
  associate: associateMarketing,
} = require('./UserMarketing.model');

const {
  User,
  associate: associateUser,
} = require('./User.model');

const {
  AuthenticationAuthority,
  associate: associateAuthenticationAuthority,
} = require('./AuthenticationAuthority.model');

const associateAll = () => {
  associateMarketing();
  associateCompany();
  associateTeamRole();
  associateUserRole();
  associateVerificationCode();
  associateUser();
  associateAuthenticationAuthority();
  associateRelease();
  associateApplication();
  associatePlatform();
};

// setTimeout(async () => {
//   debugger;
//   try {
//     associateAll();
//     // await sequelize.sync({ });
//     await sequelize.sync({ force: true });
//     // await sequelize.sync({ force: true });
//     debugger;
//   } catch (error) {
//     debugger;
//   }
// }, 2000);

module.exports = {
  AuthenticationAuthority,
  User,
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
