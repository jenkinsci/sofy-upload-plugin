const { DataTypes, Model } = require('sequelize');

class ApplicationPackage extends Model {
    /**
     * Initilizes the ApplicationPackage Model for the given sequelize instance
     * @param {Sequelize} sequelize - connected sequelize instance to database
     */
    static init(sequelize) {
        super.init({
            applicationPackageId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            version: { type: DataTypes.STRING, allowNull: false },
            hash: { type: DataTypes.STRING, allowNull: false },
            appIcon: { type: DataTypes.STRING, allowNull: false },
            minSDK: { type: DataTypes.STRING },
            targetSDK: { type: DataTypes.STRING },
            fileLocation: { type: DataTypes.STRING },

        }, { sequelize });
    }

    /**
    * Associates and establishes relationships of this model with other models
    */
    static associate() {
        const { Application } = this.sequelize.models;

        this.belongsTo(Application, {
            onDelete: 'NO ACTION',
            foreignKey: {
                allowNull: false,
                name: 'id',
                field: 'id',
            },
        });
    }
}

module.exports = ApplicationPackage;
