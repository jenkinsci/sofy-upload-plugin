const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const { GOGOLE_CLIENT_ID } = process.env;

const client = new OAuth2Client();

module.exports = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOGOLE_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();
    req.user = {
      email: email,
      name: name,
      picture: picture,
      googleId: sub,
    };
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message.startsWith("Token used too late")) {
      return next(createError(401, "Token expired"));
    }
    next(createError(401, error.message));
  }
};
