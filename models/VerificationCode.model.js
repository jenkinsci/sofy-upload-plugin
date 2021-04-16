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

const associate = () => {
  VerificationCode.belongsTo(sequelize.models.User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
};

module.exports = {
  VerificationCode,
  associate,
};
