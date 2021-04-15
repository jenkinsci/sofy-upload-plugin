const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const TeamRole = sequelize.define('TeamRole', {
  teamRoleId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  TeamRole,
};
