const { DataTypes, Model } = require('sequelize');

class Platform extends Model {
    /**
     * Initilizes the Platform for the given sequelize instance
     * @param {Sequelize} sequelize - connected sequelize instance to database
     */
    static init(sequelize) {
        super.init({
            platformId: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },

        }, { sequelize });
    }

    /**
    * Associates and establishes relationships of this model with other models
    */
    static associate() {
        const { ApplicationPackage } = this.sequelize.models;

        this.hasMany(ApplicationPackage, {
            onDelete: 'NO ACTION',
            foreignKey: { name: 'platformId', allowNull: false },
            sourceKey: 'platformId',
        });
    }
}

module.exports = Platform;
