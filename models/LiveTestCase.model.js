const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const LiveTestCase = sequelize.define('LiveTestCase', {
  liveTestCaseId: {
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
  LiveTestCase.belongsTo(sequelize.models.Application, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'applicationId', allowNull: false },
  });
  LiveTestCase.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
  LiveTestCase.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'assignedTo', allowNull: false },
  });
  LiveTestCase.hasMany(sequelize.models.LiveTestRun, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'liveTestCaseId', allowNull: false },
  });
};

module.exports = {
  LiveTestCase,
  associate,
};
