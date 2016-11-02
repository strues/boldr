import passport from 'passport';
import conf from '../../../config/config';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: conf.get('session.secret')
};

export default function configureJwt(User) {
  passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await User.query().findById(payload.sub).first();
    if (!user) {
      return done(null, false, { message: 'This email is not registered.' });
    } else {
      user.stripPassword();
      return done(null, user);
    }
  }));
}
