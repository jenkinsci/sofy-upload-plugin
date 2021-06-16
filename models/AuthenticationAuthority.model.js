const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const AuthenticationAuthority = sequelize.define("AuthenticationAuthority", {
  authenticationAuthorityId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  redirectUrl: {
    type: DataTypes.STRING,
  },
});

const associate = () => {
  AuthenticationAuthority.hasMany(sequelize.models.User, {
    onDelete: "NO ACTION",
    foreignKey: {
      name: "authenticationAuthorityId",
    },
  });
};

module.exports = {
  AuthenticationAuthority,
  associate,
};
