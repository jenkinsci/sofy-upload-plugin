const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ENTER_PUB_KEY",
  // algorithms: ["RS256"],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      console.log(jwt_payload);

      const user = { _id: 1, name: "Taha" };
      return done(null, user);
      // User.findOne({ _id: jwt_payload.sub }, function (err, user) {
      //   if (err) {
      //     return done(err, false);
      //   }
      //   if (user) {
      //     return done(null, user);
      //   } else {
      //     return done(null, false);
      //   }
      // });
    })
  );
};
