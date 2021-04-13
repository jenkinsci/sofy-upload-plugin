const Joi = require('joi');
const router = require("express").Router();
const { subscription: { btTokenGeneration }, } = require("../controller");
const { subscription: { createSubscription }, } = require("../controller");
const { subscription: { cancelSubscription }, } = require("../controller");
const { subscription: { brainTreeWebHookHandler }, } = require("../controller");
const { validateSchema } = require('../middlewares');



router.get("/getClientToken/:userGuid", async (req, res, next) => {
  const userGuid = req.params.userGuid;
  try {
    const token = await btTokenGeneration(userGuid);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

router.post("/createSubscription",
  validateSchema({
    body: Joi.object({
      paymentMethodNonce: Joi.string().required(),
      planId: Joi.string().required(),
      user_guid: Joi.string().required()
    }),
  }), async (req, res, next) => {
    const{
      paymentMethodNonce, planId, user_guid
    } = req.body;
    try {
      var status = await createSubscription(paymentMethodNonce, planId, user_guid);
      res.json({
        message: 'Subscription Successfull',
        status,
      });
    } catch (error) {
        next(error);
    }
  });

router.post("/cancel/:userGuid", async (req, res, next) => {
    var userGuid = req.params.userGuid;
    try {
      var status = await cancelSubscription(userGuid);
      res.json({
        message: 'Subscription Cancelled',
        status,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/handleBraintreeWebhook",
  validateSchema({
    body: Joi.object({
      bt_signature: Joi.string().required(),
      bt_payload: Joi.string().required()
    }),
  }), async (req, res, next) => {
    const { bt_signature, bt_payload } = req.body;
    try {
      var status = await brainTreeWebHookHandler(bt_signature, bt_payload);
      res.json({
        status
      });
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;
