const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const { TESTDATA_KINDS } = require('../constants');

const TestData = sequelize.define('TestData', {
    testDataId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kind: {
        type: DataTypes.ENUM(Object.values(TESTDATA_KINDS)),
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    patternLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    isRemoved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

const associate = () => TestData.belongsTo(sequelize.models.Application, {
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'applicationId',
        allowNull: false,
    },
});

module.exports = {
    TestData,
    associate,
};
