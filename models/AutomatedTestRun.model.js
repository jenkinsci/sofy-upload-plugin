const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const AutomatedTestRun = sequelize.define('AutomatedTestRun', {
    automatedTestRunId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
    AutomatedTestRun.belongsTo(sequelize.models.AutomatedTestCase, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'automatedTestCaseId', allowNull: false },
    });
};

module.exports = {
    AutomatedTestRun,
    associate,
};
