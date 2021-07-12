const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const DeviceType = sequelize.define('DeviceType', {
    deviceTypeId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    board: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const associate = () => {
    DeviceType.hasMany(sequelize.models.Device, {
        foreignKey: {
            onDelete: 'NO ACTION',
            name: 'deviceTypeId',
        },
    });
};

module.exports = {
    DeviceType,
    associate,
};
