class AuthController {
    /**
     * Initializes a new instance of auth controller
     * @param {Object} dependencies - dependecies of auth controller
     * @param {typeof UserModel} dependencies.UserModel - Initialized and associated UserModel
     */
    constructor(dependencies = {}) {
        if (!dependencies.UserModel) {
            throw new Error('UserModel is required');
        }

        this.UserModel = dependencies.UserModel;
    }

    /**
     * Authenticates User
     * @param {string} email - User email for login
     * @param {string} password - User password string
     * @returns {boolean} Status represting whether the email password combinatioon is valid
     */
    async login(email, password) {
        const user = await this.UserModel.findByEmail(email);
        const isValidPassword = await user.isValidPassword(password);

        if (isValidPassword) {
            return true;
        }

        if (!user.isValidOldPassword(email, password)) {
            return false;
        }

        user.password = password;
        user.oldPassword = null;
        await user.save();

        return true;
    }

    /**
     * Registers a new user to the database
     * @param {string} email - Email of user
     * @param {string} password - Password of user
     */
    async register(email, password) {
        const existingUser = await this.UserModel.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        await this.UserModel.create({
            email,
            password,
        });
    }
}

module.exports = AuthController;
