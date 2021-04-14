const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Platform = sequelize.define('Platform', {
  platformId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => Platform.hasMany(sequelize.models.Application, {
  foreignKey: {
    name: 'platformId',
    allowNull: false,
  },
});

module.exports = {
  Platform,
  associate,
};
