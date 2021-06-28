const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userGuid: { type: 'UNIQUEIDENTIFIER', defaultValue: DataTypes.UUIDV4 },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING(100), allowNull: false },
  password: { type: DataTypes.STRING(500), allowNull: false },
  isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  isConverted: { type: DataTypes.BOOLEAN },
  lastLoggedInAt: { type: DataTypes.DATE },
  region: { type: DataTypes.STRING(50) },
  utc: { type: DataTypes.INTEGER },
  phone: { type: DataTypes.STRING(30) },
  isPortalTutorialDone: { type: DataTypes.BOOLEAN, defaultValue: false },
  isLabTutorialDone: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAppSelected: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const associate = () => {
  User.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'parentId' },
  });
  User.belongsTo(sequelize.models.TeamRole, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'teamRoleId' },
  });
  User.belongsTo(sequelize.models.UserRole, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userRoleId' },
  });
  User.belongsTo(sequelize.models.Company, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'companyId' },
  });
  User.hasOne(sequelize.models.VerificationCode, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userId', allowNull: false },
  });
  User.hasOne(sequelize.models.UserMarketing, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userId', allowNull: false },
  });
  User.belongsTo(sequelize.models.AuthenticationAuthority, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'authenticationAuthorityId' },
  });
  User.hasMany(sequelize.models.Application, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userId', allowNull: false },
    sourceKey: 'userId',
  });
  User.hasMany(sequelize.models.LiveTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'assignedTo', allowNull: false },
  });
  User.hasMany(sequelize.models.LiveTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
  User.hasMany(sequelize.models.ApplicationPackage, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
  User.hasMany(sequelize.models.ApplicationPackage, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'assignedTo', allowNull: false },
  });
  User.hasMany(sequelize.models.AutomatedTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
};

module.exports = {
  User,
  associate,
};
