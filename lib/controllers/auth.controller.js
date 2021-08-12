const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { FRONTEND_URL } = require('../config');
const Email = require('../services/email/email.service');

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
        const {
            UserModel,
            UserCode,
        } = dependencies;

        if (!UserModel) {
            throw new Error('UserModel is required');
        }
        if (!UserCode) {
            throw new Error('UserCode is required');
        }

        this.UserModel = UserModel;
        this.UserCode = UserCode;
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
            if (!user.isEmailVerified) {
                throw createError(401, 'Your email is not verified');
            }
            return user;
        }

        if (!user.isValidOldPassword(email, password)) {
            throw createError(401, 'You have enetered invalid credentials');
        }

        user.password = password;
        user.oldPassword = null;
        await user.save();

        if (!user.isEmailVerified) {
            throw createError(401, 'Your email is not verified');
        }
        return user;
    }

    /**
   * Registers a new user to the database
   * @param {string} email - Email of user
   * @param {string} password - Password of user
   * @returns {UserModel} newly created user
   * @throws {createError.HttpError}
   */
    async register(email, password, name, company, phone) {
        const existingUser = await this.UserModel.findByEmail(email);
        if (existingUser) {
            throw createError(409, 'User already exists');
        }

        const emailVerificationCode = uuidv4();
        const [firstName, lastName] = name.split(' ');
        const user = await this.UserModel.create({
            email,
            password,
            firstName,
            lastName,
            company,
            phone,
        });

        await this.UserCode.create({
            code: emailVerificationCode,
            userId: user.id,
            kind: this.UserCode.codeKinds.EMAIL_VERIFICATION,
        });

        const emailVerificationURL = `${FRONTEND_URL}/verify-email?code=${emailVerificationCode}`;
        await new Email(email, Email.templates.REGISTER, { emailVerificationURL }).send();

        return user;
    }

    async verifyEmail(code) {
        const userCode = await this.UserCode.findOne({
            where: {
                code,
                kind: this.UserCode.codeKinds.EMAIL_VERIFICATION,
            },
        });

        if (!userCode) {
            throw createError(401, 'Verification code is not valid');
        }

        await this.UserModel.update(
            { isEmailVerified: true }, {
                where: { id: userCode.userId },
            },
        );
    }

    async resendVerificationEmail(email) {
        const emailVerificationCode = uuidv4();
        const user = await this.UserModel.findByEmail(email);
        if (!user) {
            throw createError(401, 'No user found');
        }

        await this.UserCode.create({
            code: emailVerificationCode,
            userId: user.id,
            kind: this.UserCode.codeKinds.EMAIL_VERIFICATION,
        });
        const emailVerificationURL = `${FRONTEND_URL}/verify-email?code=${emailVerificationCode}`;
        await new Email(email, Email.templates.REGISTER, { emailVerificationURL }).send();
    }

    async resetPassword(code, newPassword) {
        const userCode = await this.UserCode.findOne({
            where: {
                code,
                kind: this.UserCode.codeKinds.RESET_PASSWORD,
            },
        });

        if (!userCode) {
            throw createError(400, 'Invalid code');
        }

        if (moment(userCode.createdAt).add(10, 'minutes').isBefore(moment())) {
            throw createError(400, 'Code is expired');
        }

        await this.UserModel.update(
            { password: newPassword },
            { where: { id: userCode.userId } },
        );
    }

    async requestResetPassword(email) {
        const user = await this.UserModel.findByEmail(email);
        if (!user) {
            throw createError(401, 'User not found');
        }
        const code = uuidv4();
        await this.UserCode.create({
            code,
            userId: user.id,
            kind: this.UserCode.codeKinds.RESET_PASSWORD,
        });

        try {
            await new Email(email, Email.templates.RESET_PASSWORD, {
                resetPasswordURL: `${FRONTEND_URL}?code=${code}`,
            }).send();
        } catch (error) {
            throw createError(500, 'Error while sending email for reset password');
        }
    }
}

module.exports = AuthController;
