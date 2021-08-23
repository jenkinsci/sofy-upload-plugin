const { ExpressRouter } = require('@utilities');

class ApplicationRouter extends ExpressRouter {
    /**
     * Initialises new instance of Auth Router
     * @param {ExpressApplication} app - Express application to attach router to
     * @param {string} mountPoint - Path to mount the router
     * @param {AuthController} authController - Auth controller instance
     */
    constructor(app, mountPoint, ApplicationController) {
        super(app, mountPoint);

        this.ApplicationController = ApplicationController;
    }

    /**
     * Setups all the routes
     */
    setupRoutes() {
        this.router.post('/', this.createApplication.bind(this));
        this.router.delete('/:id', this.deleteApplication.bind(this));
        this.router.patch('/:id', this.updateApplication.bind(this));
        this.router.get('/:id', this.getApplication.bind(this));
        this.router.get('/', this.getAllApplication.bind(this));
    }

    async createApplication(req, res, next) {
        const { packageName, userId } = req.body;
        if (!packageName || !userId) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationController.createApplication(packageName, userId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteApplication(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            await this.ApplicationController.deleteApplication(id);
            res.json({ message: 'application deleted' });
        } catch (error) {
            next(error);
        }
    }

    async updateApplication(req, res, next) {
        const { id } = req.params;
        const { packageName } = req.body;
        if (!packageName || !id) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationController.updateApplication(id, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getApplication(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Required fields missing' });
            return;
        }
        try {
            const data = await this.ApplicationController.getApplication(id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getAllApplication(req, res, next) {
        try {
            const data = await this.ApplicationController.getAllApplication();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ApplicationRouter;
