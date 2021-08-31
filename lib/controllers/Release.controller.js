const createError = require('http-errors');
const moment = require('moment');
const { Op } = require('sequelize');

class ReleaseController {
    /**
   * Initializes a new instance of Release controller
   *
   */
    constructor(dependencies = {}) {
        const {
            ReleaseModel,
        } = dependencies;

        if (!ReleaseModel) {
            throw new Error('ReleaseModel is required');
        }
        this.ReleaseModel = ReleaseModel;
    }

    /**
   * Create Release
   * @param {json} data - Release related data of the application
   * @returns {json} data - Created Release data
   * @throws {createError}
   */

    async createRelease(data) {
        const {
            name, description, startDate, endDate, id,
        } = data;

        if (!name || !description || !startDate || !endDate || !id) {
            throw createError(409, 'Fields are not Missing');
        }

        const dateStart = moment(startDate);
        const dateEnd = moment(endDate);

        if ((dateStart > dateEnd) || (dateStart < moment()) || (dateEnd < moment())) {
            throw createError(409, 'Dates are not valid');
        }

        const overlappedRows = await this.ReleaseModel.count({
            where: {
                [Op.and]: [{
                    id: {
                        [Op.eq]: id,
                    },
                }, {

                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.lte]: startDate,
                                    },

                                },
                                {
                                    endDate: {
                                        [Op.gte]: endDate,
                                    },
                                },
                            ],

                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.lte]: endDate,
                                    },
                                },
                                {
                                    endDate: {
                                        [Op.gte]: endDate,
                                    },
                                },
                            ],
                        },
                        {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.gte]: startDate,
                                    },
                                },
                                {
                                    endDate: {
                                        [Op.lte]: endDate,
                                    },
                                },
                            ],
                        },
                    ],
                },
                ],
            },
        });

        if (overlappedRows !== 0) {
            throw createError(409, 'Another Release collide with given dates');
        }

        const app = await this.ReleaseModel.create({
            name,
            description,
            startDate,
            endDate,
            id,
        });

        return app;
    }
    /**
   * Delete release by releaseid
   * @param {uuid} releaseId - id of the release
   * @returns {boolean} Status representing release is deleted or not
   */

    async deleteRelease(releaseId) {
        const existingaApp = await this.ReleaseModel.findByPk(releaseId);
        if (!existingaApp) {
            throw createError(409, 'Release not exists');
        }
        const app = await this.ReleaseModel.destroy({
            where: { releaseId },
        });
        return app;
    }

    /**
   * Update release
   * @param {string} releaseId - id of the release
   * @param {json Object} body - thing to update
   * @returns {json Object} - update release data
   */

    async updateRelease(releaseId, body) {
        const existingaApp = await this.ReleaseModel.findByPk(releaseId);
        if (!existingaApp) {
            throw createError(409, 'Release not exists');
        }

        await this.ReleaseModel.update(body, {
            where: { releaseId },
        });

        return this.ReleaseModel.findOne({
            where: { releaseId },
        });
    }

    /**
   * Get release by id
   * @param {uuid} releaseId - id of the release
   * @returns {json Object} release details representing application data
   * @throws {createError}
   */

    async getRelease(releaseId) {
        const existingaApp = await this.ReleaseModel.findByPk(releaseId);
        if (!existingaApp) {
            throw createError(409, 'Release not exists');
        }
        const app = await this.ReleaseModel.findOne({
            where: { releaseId },
        });
        return app;
    }

    /**
   * Get All release
   * @returns {json Object} release details representing release data
   */

    async getAllRelease() {
        const app = await this.ReleaseModel.findAll();
        return app;
    }
}

module.exports = ReleaseController;
