const {
  Application,
  associate: associateApplication,
} = require("./Application.model");

const {
  VerificationCode,
  associate: associateVerificationCode,
} = require("./VerificationCode.model");

const {
  UserMarketing,
  associate: associateMarketing,
} = require("./UserMarketing.model");

const { User, associate: associateUser } = require("./User.model");

const {
  AuthenticationAuthority,
  associate: associateAuthenticationAuthority,
} = require("./AuthenticationAuthority.model");

const { Release, associate: associateRelease } = require("./Release.model");
const { Platform, associate: associatePlatform } = require("./Platform.model");
const { Company, associate: associateCompany } = require("./Company.model");
const { UserRole, associate: associateUserRole } = require("./UserRole.model");
const { TeamRole, associate: associateTeamRole } = require("./TeamRole.model");

const associateAll = () => {
  associateUser();
  associateCompany();
  associateRelease();
  associateTeamRole();
  associateUserRole();
  associatePlatform();
  associateMarketing();
  associateApplication();
  associateVerificationCode();
  associateAuthenticationAuthority();
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
  User,
  Release,
  Company,
  Platform,
  UserRole,
  TeamRole,
  Application,
  associateAll,
  UserMarketing,
  VerificationCode,
  AuthenticationAuthority,
};
