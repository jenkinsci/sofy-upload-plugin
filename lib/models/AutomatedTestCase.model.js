const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const AutomatedTestCase = sequelize.define('AutomatedTestCase', {
  automatedTestCaseId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  automatedTestCaseGUID: {
    type: 'UNIQUEIDENTIFIER',
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  isSuggested: { type: DataTypes.BOOLEAN },
  isDesigned: { type: DataTypes.BOOLEAN },
  designJsonUrl: { type: DataTypes.STRING },
  designJsonminUrl: { type: DataTypes.STRING },
  activityNames: { type: DataTypes.STRING },
});

const associate = () => {
  AutomatedTestCase.belongsTo(sequelize.models.Application, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId', allowNull: false },
  });
  AutomatedTestCase.hasMany(sequelize.models.AutomatedTestRun, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'automatedTestCaseId', allowNull: false },
  });
  AutomatedTestCase.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
};

module.exports = {
  AutomatedTestCase,
  associate,
};
