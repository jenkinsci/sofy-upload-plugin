const { DataTypes, Model } = require('sequelize');

class Application extends Model {
    /**
     * Initilizes the ApplicationModel for the given sequelize instance
     * @param {Sequelize} sequelize - connected sequelize instance to database
     */
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            packageName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        }, { sequelize });
    }

    /**
    * Associates and establishes relationships of this model with other models
    */
    static associate() {
        const { User } = this.sequelize.models;

        this.belongsTo(User, {
            onDelete: 'NO ACTION',
            foreignKey: {
                allowNull: false,
                name: 'userId',
                field: 'userId',
            },
        });
    }
}

module.exports = Application;
