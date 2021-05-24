const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const Company = sequelize.define("Company", {
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

const associate = () => {
  Company.hasMany(sequelize.models.User, {
    onDelete: "NO ACTION",
    foreignKey: {
      name: "companyId",
    },
  });
};

module.exports = {
  Company,
  associate,
};
