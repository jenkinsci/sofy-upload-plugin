const router = require("express").Router();
const { subscription: { BTTokenGeneration }, } = require("../controller");
const { subscription: { CreateSubscription }, } = require("../controller");
const { subscription: { CancelSubscription }, } = require("../controller");
const { subscription: { BrainTreeWebHookHandler }, } = require("../controller");

router.get("/getClientToken/:userGuid", async (req, res) => {
  const userGuid = req.params.userGuid;
  try {
    const token = await BTTokenGeneration(userGuid);
    res.json(token);
  } catch (error) {
    return { "Message": error, "StatusCode": "500" };
  }
});

router.post("/createSubscription", async (req, res) => {
    var paymentMethodNonce = req.body.paymentMethodNonce;
    var planId = req.body.planId;
    var user_guid = req.body.user_guid;
    try {
      var status = await CreateSubscription(paymentMethodNonce, planId, user_guid);
      res.status(status.StatusCode).json(status);
    } catch (error) {
        return { "Message": error, "StatusCode": "500" };
    }
  });

router.post("/cancelSubscription/:userGuid", async (req, res) => {
    var userGuid = req.params.userGuid;
    try {
      var status = await CancelSubscription(userGuid);
      res.status(status.StatusCode).json(status);
    } catch (error) {
        return { "Message": error, "StatusCode": "500" };
    }
  });

  router.post("/handleBraintreeWebhook", async (req, res) => {
    var bt_signature = req.body.bt_signature;
    var bt_payload = req.body.bt_payload;
    try {
      var status = await BrainTreeWebHookHandler(bt_signature, bt_payload);
      res.status(status.StatusCode).json(status);
    } catch (error) {
        return { "Message": error, "StatusCode": "500" };
    }
  });
  

module.exports = router;
