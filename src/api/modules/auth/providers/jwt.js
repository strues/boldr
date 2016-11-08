import passport from 'passport';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../../config/config');

const sessionConfig = config.get('session');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: sessionConfig.secret,
};

export default function configureJwt(User) {
  passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    const NOW = new Date().getTime();
    if (payload.exp < NOW) {
      return done(null, false);
    }
    const user = await User.query().findById(payload.sub).first();
    if (!user) {
      return done(null, false, { message: 'This email is not registered.' });
    } else {
      user.stripPassword();
      return done(null, user);
    }
  }));
}
