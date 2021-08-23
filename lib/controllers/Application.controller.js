const createError = require('http-errors');

class ApplicationController {
    /**
   * Initializes a new instance of application controller
   *
   */
    constructor(dependencies = {}) {
        const {
            ApplicationModel,
        } = dependencies;

        if (!ApplicationModel) {
            throw new Error('ApplicationModel is required');
        }
        this.ApplicationModel = ApplicationModel;
    }

    /**
   * Create Application
   * @param {string} packageName - name of the application
   * @returns {boolean} Status representing application is created or not
   */

    async createApplication(packageName, userId) {
        const app = await this.ApplicationModel.create({
            packageName,
            userId,
        });

        return app;
    }
    /**
   * Delete Application by id
   * @param {uuid} id - id of the application
   * @returns {boolean} Status representing application is deleted or not
   */

    async deleteApplication(id) {
        const existingaApp = await this.ApplicationModel.findByPk(id);
        if (!existingaApp) {
            throw createError(409, 'Application not exists');
        }
        const app = await this.ApplicationModel.destroy({
            where: { id },
        });
        return app;
    }

    /**
   * Update Application
   * @param {string} id - id of the application
   * @param {Json} body - thing to update
   * @returns {boolean} Status representing application is updated or not
   */

    async updateApplication(id, body) {
        const existingaApp = await this.ApplicationModel.findByPk(id);
        if (!existingaApp) {
            throw createError(409, 'Application not exists');
        }
        await this.ApplicationModel.update(body, {
            where: { id },
        });

        return this.ApplicationModel.findOne({
            where: { id },
        });
    }

    /**
   * Get Application by id
   * @param {uuid} id - id of the application
   * @returns {json} Application details representing application data
   */

    async getApplication(id) {
        const existingaApp = await this.ApplicationModel.findByPk(id);
        if (!existingaApp) {
            throw createError(409, 'Application not exists');
        }
        const app = await this.ApplicationModel.findOne({
            where: { id },
        });
        return app;
    }

    /**
   * Get All Applications
   * @returns {json} Application details representing applications data
   */

    async getAllApplication() {
        const app = await this.ApplicationModel.findAll();
        return app;
    }
}

module.exports = ApplicationController;
