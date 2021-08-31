const { ExpressRouter } = require('@utilities');

class ApplicationPackageRouter extends ExpressRouter {
    /**
     * Initialises new instance of Auth Router
     * @param {ExpressApplication} app - Express application to attach router to
     * @param {string} mountPoint - Path to mount the router
     * @param {AuthController} authController - Auth controller instance
     */
    constructor(app, mountPoint, ApplicationPackageController) {
        super(app, mountPoint);

        this.ApplicationPackageController = ApplicationPackageController;
    }

    /**
     * Setups all the routes
     */
    setupRoutes() {
        this.router.post('/', this.createApplicationPackage.bind(this));
        this.router.delete('/:applicationPackageId', this.deleteApplicationPackage.bind(this));
        this.router.patch('/:applicationPackageId', this.updateApplicationPackage.bind(this));
        this.router.get('/:applicationPackageId', this.getApplicationPackage.bind(this));
        this.router.get('/appPackage/all', this.getAllApplicationPackage.bind(this));
    }

    /**
     * create ApplicationPackage handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */

    async createApplicationPackage(req, res, next) {
        const reqData = req.body;
        if (!reqData) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationPackageController.createApplicationPackage(reqData);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * delete ApplicationPackage handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */

    async deleteApplicationPackage(req, res, next) {
        const { applicationPackageId } = req.params;
        if (!applicationPackageId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            await this.ApplicationPackageController.deleteApplicationPackage(applicationPackageId);
            res.json({ message: 'applicationPackage deleted' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * update ApplicationPackage handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */

    async updateApplicationPackage(req, res, next) {
        const { applicationPackageId } = req.params;
        if (!req.body || !applicationPackageId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationPackageController.updateApplicationPackage(applicationPackageId, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * get ApplicationPackage handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async getApplicationPackage(req, res, next) {
        const { applicationPackageId } = req.params;
        if (!applicationPackageId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationPackageController.getApplicationPackage(applicationPackageId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * get all ApplicationPackage handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async getAllApplicationPackage(req, res, next) {
        try {
            const data = await this.ApplicationPackageController.getAllApplicationPackage();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ApplicationPackageRouter;
