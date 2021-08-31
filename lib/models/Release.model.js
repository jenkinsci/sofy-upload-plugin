const { DataTypes, Model } = require('sequelize');

class Release extends Model {
    /**
     * Initilizes the ReleaseModel for the given sequelize instance
     * @param {Sequelize} sequelize - connected sequelize instance to database
     */
    static init(sequelize) {
        super.init({
            releaseId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING },
            startDate: { type: DataTypes.DATE, allowNull: false },
            endDate: { type: DataTypes.DATE, allowNull: false },

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

module.exports = Release;
