const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Application = sequelize.define('Application', {
  applicationId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  applicationGuid: {
    type: 'UNIQUEIDENTIFIER',
    defaultValue: DataTypes.UUIDV4,
  },
  packageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const associate = () => {
  Application.hasMany(sequelize.models.Release, {
    foreignKey: 'applicationId',
  });
  Application.belongsTo(sequelize.models.Platform, {
    foreignKey: {
      name: 'platformId',
      allowNull: false,
    },
  });
};

module.exports = {
  Application,
  associate,
};
