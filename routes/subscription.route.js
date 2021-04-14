const Joi = require('joi');
const router = require("express").Router();
const { subscription: { btTokenGeneration }, } = require("../controller");
const { subscription: { createSubscription }, } = require("../controller");
const { subscription: { cancelSubscription }, } = require("../controller");
const { subscription: { brainTreeWebHookHandler }, } = require("../controller");
const { validateSchema } = require('../middlewares');


//Step 1 (Payment initiation): Sofy client (web) requests user specific token from Braintree server via sofy server by sending user's guid.
router.get("/getClientToken/:userGuid", async (req, res, next) => {
  const userGuid = req.params.userGuid;
  try {
    const token = await btTokenGeneration(userGuid);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

/* Step 2 (Subscription Creation) Sofy client sends request message containing 3 essential keys:
1)  Payment method nonce : generated by braintree using its generated user specific token and user credit/debit card credentials.
2)  planId: Plan BTreeCode code on which user wants to subscribe.
3)  user_guid: Unique identifier of a user.
*/
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

//api to cancell the currently active subscription on Braintree
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

  //api to listen to Braintree webhooks
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
