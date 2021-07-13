const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Application = sequelize.define('Application', {
  applicationId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  applicationGuid: {
    type: 'UNIQUEIDENTIFIER',
    defaultValue: DataTypes.UUIDV4,
  },
  packageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => {
  Application.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userId', allowNull: false },
    targetKey: 'userId',
  });
  Application.hasMany(sequelize.models.Release, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId', allowNull: false },
  });
  Application.belongsTo(sequelize.models.Platform, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'platformId', allowNull: false },
    targetKey: 'platformId',
  });
  Application.hasMany(sequelize.models.TestData, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId' },
  });
  Application.hasMany(sequelize.models.LiveTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId', allowNull: false },
  });
  Application.hasMany(sequelize.models.AutomatedTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId', allowNull: false },
  });
};

module.exports = {
  Application,
  associate,
};
