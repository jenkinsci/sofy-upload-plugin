const router = require("express").Router();

const { token: { BTTokenGeneration }, } = require("../controller");

router.get("/getClientToken/:userGuid", async (req, res) => {
  const userGuid = req.params.userGuid;
  try {
    const token = await BTTokenGeneration(userGuid);
    res.json(token);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
