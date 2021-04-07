const router = require('express').Router();
const Joi = require('joi');

const { validateSchema } = require('../middlewares');
const {
  release: { updateRelease },
} = require('../controller');

router.patch('/:releaseId',
  validateSchema({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { releaseId } = req.params;
      const {
        name, description, startDate, endDate,
      } = req.body;

      const updatedRelease = await updateRelease(releaseId, {
        name,
        description,
        startDate,
        endDate,
      });

      res.json({
        message: 'Release has been updated successfully',
        updatedRelease,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
