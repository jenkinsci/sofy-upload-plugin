const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const UserRole = sequelize.define('UserRole', {
  userRoleId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => {
  UserRole.hasMany(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'userRoleId' },
  });
};

module.exports = {
  UserRole,
  associate,
};
