const { UUIDV4 } = require('sequelize');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const VerificationCode = sequelize.define('VerificationCode', {
  verificationCodeId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: 'UNIQUEIDENTIFIER',
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
});

module.exports = {
  VerificationCode,
};
