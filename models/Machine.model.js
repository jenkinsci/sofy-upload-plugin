const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Machine = sequelize.define('Machine', {
  machineId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => {
  Machine.hasMany(sequelize.models.Device, {
    foreignKey: { onDelete: 'NO ACTION', name: 'machineId' },
  });
};

module.exports = {
  Machine,
  associate,
};
