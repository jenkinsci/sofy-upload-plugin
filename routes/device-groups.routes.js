const router = require("express").Router();
const {
  deviceGroup: { getDeviceGroupsList },
} = require("../controller");

router.get("/", async (req, res, next) => {
  try {
    const deviceGroups = await getDeviceGroupsList();
    res.json(deviceGroups);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
