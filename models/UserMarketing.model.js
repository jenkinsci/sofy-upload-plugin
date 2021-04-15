const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const UserMarketing = sequelize.define('UserMarketing', {
  userMarketingId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  utm_source: {
    type: DataTypes.STRING(30),
  },
  utm_medium: {
    type: DataTypes.STRING(30),
  },
  utm_campaign: {
    type: DataTypes.STRING(30),
  },
  gclid: {
    type: DataTypes.STRING(30),
  },
});

const associate = () => {

};

module.exports = {
  UserMarketing,
  associate,
};
