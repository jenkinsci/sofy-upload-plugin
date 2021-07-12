const { DataTypes, Model, Sequelize } = require('sequelize');
const { fakeServer } = require('sinon');

const { sequelize } = require('../config/sequelize');

const UserOld = sequelize.define('User', {
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userGuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
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
    UserOld.belongsTo(sequelize.models.User, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'parentId' },
    });
    UserOld.belongsTo(sequelize.models.TeamRole, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'teamRoleId' },
    });
    UserOld.belongsTo(sequelize.models.UserRole, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'userRoleId' },
    });
    UserOld.belongsTo(sequelize.models.Company, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'companyId' },
    });
    UserOld.hasOne(sequelize.models.VerificationCode, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'userId', allowNull: false },
    });
    UserOld.hasOne(sequelize.models.UserMarketing, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'userId', allowNull: false },
    });
    UserOld.belongsTo(sequelize.models.AuthenticationAuthority, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'authenticationAuthorityId' },
    });
    UserOld.hasMany(sequelize.models.Application, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'userId', allowNull: false },
        sourceKey: 'userId',
    });
    UserOld.hasMany(sequelize.models.LiveTestCase, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'assignedTo', allowNull: false },
    });
    UserOld.hasMany(sequelize.models.LiveTestCase, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'createdBy', allowNull: false },
    });
    UserOld.hasMany(sequelize.models.ApplicationPackage, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'createdBy', allowNull: false },
    });
    UserOld.hasMany(sequelize.models.ApplicationPackage, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'assignedTo', allowNull: false },
    });
    UserOld.hasMany(sequelize.models.AutomatedTestCase, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'createdBy', allowNull: false },
    });
};

module.exports = {
    User: UserOld,
    associate,
};
