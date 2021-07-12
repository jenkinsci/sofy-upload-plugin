const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Release = sequelize.define('Release', {
    releaseId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
});

const associate = () => {
    Release.belongsTo(sequelize.models.Application, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'applicationId', allowNull: false },
    });
    Release.hasMany(sequelize.models.ApplicationPackage, {
        onDelete: 'NO ACTION',
        foreignKey: { name: 'releaseId', allowNull: false },
    });
};

module.exports = {
    Release,
    associate,
};
