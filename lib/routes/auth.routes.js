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
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
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
        const { email, password } = req.body;

        try {
            const data = await this.authController.register(email, password);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthRouter;
