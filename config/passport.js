const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require('passport');
const { JWT_KEY } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_KEY,
};

module.exports = (app) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      console.log(jwt_payload);

      const user = { _id: 1, name: "Taha" };
      return done(null, user);
    })
  );
  app.use(passport.initialize());
};
