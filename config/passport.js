const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const { JWT_KEY } = process.env;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_KEY,
};

module.exports = (app) => {
    passport.use(
        new JwtStrategy(options, ((jwt_payload, done) =>
        // console.log(jwt_payload);

            done(null, jwt_payload)
        )),
    );
    app.use(passport.initialize());
};
