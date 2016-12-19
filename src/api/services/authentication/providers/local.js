import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export default function configureLocal(User) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    const user = await User.query().where({ email }).eager('role').first();
    if (!user) {
      return done(null, false, { message: 'This email is not registered.' });
    }

    const validAuth = await user.authenticate(password);
    if (!validAuth) {
      return done(null, false, { message: 'This password is not correct.' });
    } else {
      return done(null, user);
    }
  }));
}
