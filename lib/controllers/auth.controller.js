const createError = require('http-errors');

/**
 * @typedef {import('../models').UserModel} UserModel
 */

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
   * @returns {UserModel} logged in user
   * @throws {createError.HttpError}
   */
    async login(email, password) {
        const user = await this.UserModel.findByEmail(email);
        if (!user) {
            throw createError(401, 'No user found against these credentials');
        }
        const isValidPassword = await user.isValidPassword(password);

        if (isValidPassword) {
            return user;
        }

        if (!user.isValidOldPassword(email, password)) {
            throw createError(401, 'You have enetered invalid credentials');
        }

        user.password = password;
        user.oldPassword = null;
        await user.save();

        return user;
    }

    /**
   * Registers a new user to the database
   * @param {string} email - Email of user
   * @param {string} password - Password of user
   * @returns {UserModel} newly created user
   * @throws {createError.HttpError}
   */
    async register(email, password) {
        const existingUser = await this.UserModel.findByEmail(email);

        if (existingUser) {
            throw createError(409, 'User already exists');
        }

        return this.UserModel.create({
            email,
            password,
        });
    }
}

module.exports = AuthController;
