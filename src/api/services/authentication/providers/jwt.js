import passport from 'passport';
import config from '../../../../../config/private/api';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const jwtOptions = {
  secretOrKey: config.token.secret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
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
      return done(null, user);
    }
  }));
}
