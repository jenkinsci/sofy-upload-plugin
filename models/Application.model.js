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
  Application.belongsTo(sequelize.models.User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
  Application.hasMany(sequelize.models.Release, {
    foreignKey: {
      name: 'applicationId',
      allowNull: false,
    },
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
