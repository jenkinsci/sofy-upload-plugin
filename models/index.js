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
const { TestData, associate: associateTestData } = require("./TestData.model");
const {
  LiveTestCase,
  associate: associateLiveTestCase,
} = require("./LiveTestCase.model");
const {
  LiveTestRun,
  associate: associateLiveTestRun,
} = require("./LiveTestRun.model");
const {
  ApplicationPackage,
  associate: associateApplicationPackage,
} = require("./ApplicationPackage.model");
const {
  AutomatedTestCase,
  associate: associateAutomatedTestCase,
} = require("./AutomatedTestCase.model");

const {
  AutomatedTestRun,
  associate: associateAutomatedTestRun,
} = require("./AutomatedTestRun.model");

const { Device, associate: associateDevice } = require("./Device.model");
const { DeviceOS, associate: associateDeviceOS } = require("./DeviceOS.model");
const {
  DeviceType,
  associate: associateDeviceType,
} = require("./DeviceType.model");
const {
  DeviceGroup,
  associate: associateDeviceGroup,
} = require("./DeviceGroup.model");

const { Machine, associate: associateMachine } = require("./Machine.model");

const associateAll = () => {
  associateUser();
  associateUserRole();
  associateCompany();
  associateTeamRole();
  associateMarketing();
  associateVerificationCode();
  associateAuthenticationAuthority();

  associateTestData();

  associateApplication();
  associateApplicationPackage();
  associatePlatform();

  associateDevice();
  associateDeviceOS();
  associateDeviceType();
  associateDeviceGroup();
  associateMachine();
  associateRelease();

  associateLiveTestRun();
  associateLiveTestCase();

  associateAutomatedTestCase();
  associateAutomatedTestRun();
};

// setTimeout(async () => {
//   try {
//     const { sequelize } = require("../config/sequelize");
//     associateAll();
//     // await sequelize.sync({ });
//     await sequelize.sync({ force: true });
//     // await sequelize.sync({ force: true });
//     debugger;
//   } catch (error) {
//     debugger;
//   }
// }, 1000);

module.exports = {
  User,
  Company,
  UserRole,
  TeamRole,
  UserMarketing,
  VerificationCode,
  AuthenticationAuthority,

  Application,
  ApplicationPackage,
  Release,
  Platform,

  TestData,

  Machine,
  Device,
  DeviceOS,
  DeviceType,
  DeviceGroup,

  LiveTestRun,
  LiveTestCase,

  AutomatedTestCase,
  AutomatedTestRun,

  associateAll,
};
