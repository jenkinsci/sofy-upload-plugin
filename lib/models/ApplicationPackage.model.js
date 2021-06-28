const { DataTypes, STRING, INTEGER } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const ApplicationPackage = sequelize.define('ApplicationPackage', {
  applicationPackageId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  applicationPackageGUID: { type: DataTypes.STRING, allowNull: false },
  frameworkId: { type: DataTypes.INTEGER, allowNull: false },
  version: { type: DataTypes.STRING, allowNull: false },
  hash: { type: DataTypes.STRING, allowNull: false },
  appIcon: { type: DataTypes.STRING, allowNull: false },
  minSDK: { type: STRING },
  targetSDK: { type: STRING },
  architecture: { type: STRING },
  fileLocation: { type: DataTypes.STRING },
  alternateFileLocation: { type: STRING },
  originalFileLocation: { type: STRING },
  statusId: { type: INTEGER },
});

const associate = () => {
  ApplicationPackage.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'createdBy', allowNull: false },
  });
  ApplicationPackage.belongsTo(sequelize.models.User, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'assignedTo', allowNull: false },
  });
  ApplicationPackage.belongsTo(sequelize.models.Release, {
    onDelete: 'NO ACTION',
    foreignKey: { name: 'releaseId', allowNull: false },
  });
};

module.exports = {
  ApplicationPackage,
  associate,
};
