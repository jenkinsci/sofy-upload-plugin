const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const UserMarketing = sequelize.define("UserMarketing", {
  userMarketingId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  utm_source: {
    type: DataTypes.STRING(20),
  },
  utm_medium: {
    type: DataTypes.STRING(20),
  },
  utm_campaign: {
    type: DataTypes.STRING(100),
  },
  gclid: {
    type: DataTypes.STRING(100),
  },
});

const associate = () => {
  UserMarketing.belongsTo(sequelize.models.User, {
    onDelete: "NO ACTION",
    foreignKey: { name: "userId", allowNull: false },
  });
};

module.exports = {
  UserMarketing,
  associate,
};
