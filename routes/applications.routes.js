const router = require('express').Router();
const {
  release: { getReleasesList },
} = require('../controller');

router.get('/:applicationId/releases', async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { lastReleaseId, rows } = req.query;

    const releases = await getReleasesList(applicationId, lastReleaseId, rows);

    res.json(releases);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
