const router = require('express').Router();

router.use('/auth', require('./auth.routes.js'));
router.use('/users', require('./users.routes.js'));

module.exports = router;