const auth = require('./auth.controller');
const deviceGroup = require('./device-group.controller');
const release = require('./release.controller');
const subscription = require('./subscription.controller');

module.exports = {
  auth,
  deviceGroup,
  release,
  subscription
};
