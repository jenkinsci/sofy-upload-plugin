const auth = require('./auth.controller');
const deviceGroup = require('./device-group.controller');
const release = require('./release.controller');
const subscription = require('./subscription.controller');
const application = require('./application.controller');

module.exports = {
    auth,
    deviceGroup,
    release,
    subscription,
    application,
};
