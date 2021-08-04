const { DataTypes, Model } = require('sequelize');

class UserCode extends Model {
    static get codeKinds() {
        return Object.freeze({
            EMAIL_VERIFICATION: 'email-verification',
            RESET_PASSWORD: 'reset-password',
        });
    }

    /**
     * Initilizes the UsetModel for the given sequelize instance
     * @param {Sequelize} sequelize - connected sequelize instance to database
     */
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            code: {
                type: DataTypes.STRING,
            },
            kind: {
                type: DataTypes.STRING,
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

module.exports = UserCode;
