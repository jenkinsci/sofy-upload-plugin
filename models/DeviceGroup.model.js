const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const DeviceGroup = sequelize.define('DeviceGroup', {
    deviceGroupId: {
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
    DeviceGroup.belongsToMany(sequelize.models.Device, {
        through: 'DeviceGroup_Device',
        foreignKey: 'deviceGroupId',
    });
};

module.exports = {
    DeviceGroup,
    associate,
};
