const createError = require('http-errors');

class ApplicationPackageController {
    /**
   * Initializes a new instance of application package controller
   *
   */
    constructor(dependencies = {}) {
        const {
            ApplicationPackageModel,
        } = dependencies;

        if (!ApplicationPackageModel) {
            throw new Error('ApplicationPackageModel is required');
        }
        this.ApplicationPackageModel = ApplicationPackageModel;
    }

    /**
   * Create Application
   * @param {object} data - detail application details
   * @returns {object} application package created data
   */

    async createApplicationPackage(data) {
        const {
            version,
            hash,
            appIcon,
            minSDK,
            targetSDK,
            fileLocation,
            id,
            Platform,
        } = data;
        const PlatformId = 1;
        const app = await this.ApplicationPackageModel.create({
            version,
            hash,
            appIcon,
            minSDK,
            targetSDK,
            fileLocation,
            id,
            PlatformId,
        });

        return app;
    }
    /**
   * Delete Application package by applicationPackageId
   * @param {uuid} id - id of the application
   * @returns {boolean} Status representing application is deleted or not
   */

    async deleteApplicationPackage(applicationPackageId) {
        const existingaApp = await this.ApplicationPackageModel.findByPk(applicationPackageId);
        if (!existingaApp) {
            throw createError(409, 'Application Package not exists');
        }
        const app = await this.ApplicationPackageModel.destroy({
            where: { applicationPackageId },
        });
        return app;
    }

    /**
   * Update Application package
   * @param {string} id - id of the applicationpackage
   * @param {Json} body - thing to update
   * @returns {object} data for application package  updated
   */

    async updateApplicationPackage(applicationPackageId, body) {
        const existingaApp = await this.ApplicationPackageModel.findByPk(applicationPackageId);
        if (!existingaApp) {
            throw createError(409, 'Application not exists');
        }
        await this.ApplicationPackageModel.update(body, {
            where: { applicationPackageId },
        });

        return this.ApplicationPackageModel.findOne({
            where: { applicationPackageId },
        });
    }

    /**
   * Get Applicationpackage by id
   * @param {uuid} id - id of the applicationpackage
   * @returns {json} Application details representing application data
   */

    async getApplicationPackage(applicationPackageId) {
        const existingaApp = await this.ApplicationModel.findByPk(applicationPackageId);
        if (!existingaApp) {
            throw createError(409, 'Application not exists');
        }
        const app = await this.ApplicationPackageModel.findOne({
            where: { applicationPackageId },
        });
        return app;
    }

    /**
   * Get All Applicationspackages
   * @returns {json} Applicationpckage details representing applications data
   */

    async getAllApplicationPackage() {
        const app = await this.ApplicationPackageModel.findAll();
        return app;
    }
}

module.exports = ApplicationPackageController;
