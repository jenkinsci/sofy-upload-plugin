const { DataTypes, Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');

class User extends Model {
    /**
   * Initilizes the UsetModel for the given sequelize instance
   * @param {Sequelize} sequelize - connected sequelize instance to database
   */
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                },
                firstName: { type: DataTypes.STRING },
                lastName: { type: DataTypes.STRING },
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    set(value) {
                        this.setDataValue('email', value.toLowerCase());
                    },
                },
                password: {
                    type: DataTypes.STRING(60),
                    allowNull: false,
                    get() {},
                    set(value) {
                        this.setDataValue('password', bcrypt.hashSync(value, 10));
                    },
                },
                oldPassword: { type: DataTypes.STRING(500) },
                isEmailVerified: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
                isConverted: { type: DataTypes.BOOLEAN },
                lastLoggedInAt: { type: DataTypes.DATE },
                region: { type: DataTypes.STRING(50) },
                utc: { type: DataTypes.INTEGER },
                phone: { type: DataTypes.STRING(30) },
                isPortalTutorialDone: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                isLabTutorialDone: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                isAppSelected: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            { sequelize },
        );
    }

    /**
   * Associates and establishes relationships of this model with other models
   */
    static associate() {
        const { User } = this.sequelize.models;

        this.belongsTo(User, {
            onDelete: 'NO ACTION',
            foreignKey: 'parentId',
        });
    }

    /**
   * Finds a user by email
   * @param {string} email - Email for lookup
   * @returns {User | null} instance of user if available
   */
    static async findByEmail(email) {
        return this.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
    }

    /**
   * Checks whether the given password is valid for user
   * @param {string} password - Password to compare
   * @returns {boolean} Status of whether the password is valid
   */
    async isValidPassword(password) {
        const hash = this.getDataValue('password');
        return bcrypt.compare(password, hash);
    }

    /**
   * Checks whether the given password is valid for user in the old formt
   * @param {string} email - email addresss of the user for old password comparison
   * @param {string} password - password for comparison
   * @returns {boolean} Status of whether the password is valid to old format
   */
    isValidOldPassword(email, password) {
        const hash = crypto.SHA512(crypto.SHA512(password) + email.toLowerCase());
        return hash === this.oldPassword;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

module.exports = User;
