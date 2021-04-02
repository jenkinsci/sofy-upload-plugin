const router = require("express").Router();

const { subscription: { BTTokenGeneration }, } = require("../controller");
const { subscription: { CancelSubscription }, } = require("../controller");

router.get("/getClientToken/:userGuid", async (req, res) => {
  const userGuid = req.params.userGuid;
  try {
    const token = await BTTokenGeneration(userGuid);
    res.json(token);
  } catch (error) {
    console.log(error);
  }
});

router.post("/cancelSubscription/:userGuid", async (req, res) => {
    var userGuid = req.params.userGuid;
    try {
      var status = await CancelSubscription(userGuid);
      res.status(status.StatusCode).json(status);
    } catch (error) {
      console.log(error);
    }
  });
  

module.exports = router;
