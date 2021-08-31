const { ExpressRouter } = require('@utilities');

class ReleaseRouter extends ExpressRouter {
    /**
     * Initialises new instance of Auth Router
     * @param {ExpressApplication} app - Express application to attach router to
     * @param {string} mountPoint - Path to mount the router
     * @param {AuthController} authController - Auth controller instance
     */
    constructor(app, mountPoint, ReleaseController) {
        super(app, mountPoint);

        this.ReleaseController = ReleaseController;
    }

    /**
     * Setups all the routes
     */
    setupRoutes() {
        this.router.post('/', this.createRelease.bind(this));
        this.router.delete('/:releaseId', this.deleteRelease.bind(this));
        this.router.patch('/:releaseId', this.updateRelease.bind(this));
        this.router.get('/:releaseId', this.getRelease.bind(this));
        this.router.get('/releaseAll/All', this.getAllRelease.bind(this));
    }

    /**
     * create Release handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async createRelease(req, res, next) {
        const reqData = req.body;
        if (!reqData) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ReleaseController.createRelease(reqData);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * delete release handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */

    async deleteRelease(req, res, next) {
        const { releaseId } = req.params;
        if (!releaseId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            await this.ReleaseController.deleteRelease(releaseId);
            res.json({ message: 'Release deleted' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * update Release handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */

    async updateRelease(req, res, next) {
        const { releaseId } = req.params;
        if (!req.body || !releaseId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ReleaseController.updateRelease(releaseId, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * get Release handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async getRelease(req, res, next) {
        const { releaseId } = req.params;
        if (!releaseId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ReleaseController.getRelease(releaseId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * get all release handler
     * @param {express.Request} req - Inflight request
     * @param {express.Response} res - Inflight response
     * @param {express.NextFunction} next - next handler
     */
    async getAllRelease(req, res, next) {
        try {
            const data = await this.ReleaseController.getAllRelease();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReleaseRouter;
