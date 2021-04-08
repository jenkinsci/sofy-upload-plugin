const router = require('express').Router();
const passport = require('passport');

router.use("/subscription", require("./subscription.route.js"));
router.use('/auth', require('./auth.routes.js'));
router.use('/users', require('./users.routes.js'));
router.use('/device-groups', passport.authenticate('jwt', { session: false }), require('./device-groups.routes'));
router.use('/applications', require('./applications.routes'));
router.use('/releases', require('./releases.routes'));

module.exports = router;
