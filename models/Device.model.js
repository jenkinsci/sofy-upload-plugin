const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Device = sequelize.define('Device', {
    deviceId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const associate = () => {
    Device.belongsTo(sequelize.models.DeviceOS, {
        foreignKey: {
            onDelete: 'NO ACTION',
            name: 'deviceOSId',
        },
    });
    Device.belongsTo(sequelize.models.DeviceType, {
        foreignKey: {
            onDelete: 'NO ACTION',
            name: 'deviceTypeId',
        },
    });
    Device.belongsTo(sequelize.models.Machine, {
        foreignKey: { onDelete: 'NO ACTION', name: 'machineId' },
    });
    Device.belongsToMany(sequelize.models.DeviceGroup, {
        through: 'DeviceGroup_Device',
        foreignKey: 'deviceId',
    });
};

module.exports = {
    Device,
    associate,
};
