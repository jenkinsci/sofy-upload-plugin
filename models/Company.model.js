const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Company = sequelize.define('Company', {
  companyId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Company,
};
