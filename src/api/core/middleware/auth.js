import cookieParser from 'cookie-parser';
import passport from 'passport';
import sessionMiddleware from './session';

export default (app) => {
  app.use(cookieParser());
  app.use(passport.initialize());

  app.use(sessionMiddleware);
  app.use(passport.session());

  app.use((req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      res.locals.user = !!user ? user : null;
      return next();
    })(req, res, next);
  });
};
