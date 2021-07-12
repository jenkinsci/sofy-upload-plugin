const Joi = require('joi');
const router = require('express').Router();

const { validateSchema } = require('../middlewares');
const {
    release: { getReleasesList },
} = require('../controller');
const { createRelease } = require('../controller/release.controller');
const { createApplication } = require('../controller/application.controller');

router.post(
    '/',
    validateSchema({
        body: Joi.object({
            packageName: Joi.string().required(),
        }),
    }),
    async (req, res, next) => {
        try {
            const { packageName } = req.body;

            const application = await createApplication({
                packageName,
            });

            res.json(application);
        } catch (error) {
            next(error);
        }
    },
);

router
    .route('/:applicationId/release')
    .get(async (req, res, next) => {
        try {
            const { applicationId } = req.params;
            const { lastReleaseId, rows } = req.query;

            const releases = await getReleasesList(
                applicationId,
                lastReleaseId,
                rows,
            );

            res.json(releases);
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { applicationId } = req.params;
            const {
                name, description, startDate, endDate,
            } = req.body;

            const releases = await createRelease(applicationId, {
                name,
                description,
                startDate,
                endDate,
            });

            res.json(releases);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
