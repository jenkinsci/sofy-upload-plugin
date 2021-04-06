const router = require('express').Router();
const passport = require('passport');

router.use('/auth', require('./auth.routes.js'));
router.use('/users', require('./users.routes.js'));
router.use('/device-groups', passport.authenticate('jwt', { session: false }), require('./device-groups.routes'));
router.use('/applications', require('./application.routes'));

module.exports = router;
