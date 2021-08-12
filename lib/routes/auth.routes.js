const { ExpressRouter } = require('@utilities');

/**
 * @typedef {import('@models').UserModel} UserModel
 * @typedef {import('@controllers').AuthController} AuthController
 * @typedef {import('express').Application} ExpressApplication
 */

class AuthRouter extends ExpressRouter {
    /**
     * Initialises new instance of Auth Router
     * @param {ExpressApplication} app - Express application to attach router to
     * @param {string} mountPoint - Path to mount the router
     * @param {AuthController} authController - Auth controller instance
     */
    constructor(app, mountPoint, authController) {
        super(app, mountPoint);

        this.authController = authController;
    }

    /**
     * Setups all the routes
     */
    setupRoutes() {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
        this.router.post('/verify-email', this.verifyEmail.bind(this));
        this.router.post('/resend-verification-email', this.resendVerificationEmail.bind(this));
        this.router.post('/request-reset-password', this.requestResetPassword.bind(this));
        this.router.post('/reset-password', this.resetPassword.bind(this));
    }

    /**
     * Login route handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const loggedInUser = await this.authController.login(email, password);
            res.json(loggedInUser);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Register route handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async register(req, res, next) {
        const {
            email, password, name, company, phone,
        } = req.body;

        try {
            const data = await this.authController.register(
                email, password, name, company, phone,
            );
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Verify email handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async verifyEmail(req, res, next) {
        const { code } = req.body;
        if (!code) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }

        try {
            await this.authController.verifyEmail(code);
            res.json({ message: 'Your email has been verified successfully' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * resend verification email handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async resendVerificationEmail(req, res, next) {
        const { email } = req.query;
        if (!email) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }

        try {
            await this.authController.resendVerificationEmail(email);
            res.json({ message: 'A verification email has been sent to your email address' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Request Reset password handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async requestResetPassword(req, res, next) {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }

        try {
            await this.authController.requestResetPassword(email);
            res.json({ message: 'A reset password code has been sent to your email address' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Reset password handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async resetPassword(req, res, next) {
        const { code } = req.body;
        if (!code) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }

        try {
            await this.authController.verifyEmail(code);
            res.json({ message: 'Your email has been verified successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthRouter;
