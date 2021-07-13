const validateSchema = require("./validateSchema.middleware");
const verifyGoogleIdToken = require("./verifyGoogleIdToken.middleware");

module.exports = {
  validateSchema,
  verifyGoogleIdToken,
};
