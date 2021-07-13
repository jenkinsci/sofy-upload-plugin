const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const DeviceOS = sequelize.define('DeviceOS', {
  deviceOSId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buildNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => {
  DeviceOS.hasMany(sequelize.models.Device, {
    foreignKey: {
      onDelete: 'NO ACTION',
      name: 'deviceOSId',
    },
  });
};

module.exports = {
  DeviceOS,
  associate,
};
