const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const TeamRole = sequelize.define('TeamRole', {
    teamRoleId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const associate = () => {
    TeamRole.hasMany(sequelize.models.User, {
        onDelete: 'NO ACTION',
        foreignKey: {
            name: 'teamRoleId',
        },
    });
};

module.exports = {
    TeamRole,
    associate,
};
