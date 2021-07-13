const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const LiveTestRun = sequelize.define('LiveTestRun', {
  liveTestRunId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  reproSteps: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  isImported: { type: DataTypes.BOOLEAN, defaultValue: false },
  isRemoved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const associate = () => {
  LiveTestRun.belongsTo(sequelize.models.LiveTestCase, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'liveTestCaseId', allowNull: false },
  });
};

module.exports = {
  LiveTestRun,
  associate,
};
