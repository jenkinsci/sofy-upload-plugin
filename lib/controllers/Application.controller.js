const createError = require('http-errors');
const moment = require('moment');

class ApplicationController {
    /**
   * Initializes a new instance of application controller
   *
   */
    constructor(dependencies = {}) {
        const {
            ApplicationModel, ApplicationPackageModel, ReleaseModel, PlatformModel,
        } = dependencies;

        if (!ApplicationModel && !ApplicationPackageModel && !ReleaseModel && !PlatformModel) {
            throw new Error('ApplicationModel is required');
        }
        this.ApplicationModel = ApplicationModel;
        this.ApplicationPackageModel = ApplicationPackageModel;
        this.ReleaseModel = ReleaseModel;
        this.PlatformModel = PlatformModel;
    }

    /**
   * Create Application
   * @param {JSON Object} data - Application, ApplicationPackage,Release details.
   * @returns {Application} Application data created
   */

    async createApplication(data) {
        const {
            packageName, userId, version,
            hash,
            appIcon,
            minSDK,
            targetSDK,
            fileLocation,
            platform,
        } = data;

        const platformId = await this.PlatformModel.findOne({ where: { name: platform } });

        // creating Appliction Model

        const app = await this.ApplicationModel.create({
            packageName,
            userId,
        });

        // creating ApplicationPackage Model

        await this.ApplicationPackageModel.create({
            version,
            hash,
            appIcon,
            minSDK,
            targetSDK,
            fileLocation,
            id: app.id,
            platformId: platformId.platformId,
        });
        const currentDate = moment();
        const lastDate = moment().add(10, 'd').toDate();

        // creating Release

        await this.ReleaseModel.create({
            name: 'DEFAULT',
            description: 'DEFAULT',
            startDate: currentDate,
            endDate: lastDate,
            id: app.id,
        });

        return app;
    }
    /**
   * Delete Application by id
   * @param {uuid} id - id of the application
   * @returns {boolean} Status representing application is deleted or not
   * @throws {createError}
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
   * @throws {createError}
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
