const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const { JWT_KEY } = require('../lib/config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_KEY,
};

module.exports = (app) => {
    passport.use(
        new JwtStrategy(
            options,
            (jwtPayload, done) => {
                done(null, jwtPayload);
            },
        ),
    );
    app.use(passport.initialize());
};
