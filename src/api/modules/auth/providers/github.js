import passport from 'passport';
import uuid from 'node-uuid';
import { Strategy as GitHubStrategy } from 'passport-github';
import conf from '../../../config/config';

const strategyOpts = {
  clientID: conf.get('social.github.id'),
  clientSecret: conf.get('social.github.secret'),
  callbackURL: '/api/v1/auth/github/callback',
  passReqToCallback: true
};

export default function configureGithub(User) {
  passport.use(new GitHubStrategy(strategyOpts, async (req, res, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      const existingUser = await User.query().where({ github_id: profile.id }).first();
      if (existingUser) {
        done();
      } else {
        const user = await User.query().findById(req.user.id);
        user.github_id = profile.id;
        await user.$relatedQuery('token').insert({
          id: uuid.v4(),
          user_verification_token: accessToken,
          user_id: user.id
        });

        await User.query().update({
          github_id: profile.id,
          first_name: profile.displayName,
          avatar_url: user.avatar_url || profile._json.avatar_url,
          location: profile._json.location,
          website: profile._json.blog
        }).where('id', req.user.id);
        return done(user);
      }
    } else {
      const existingUser = await User.query().where({ github_id: profile.id }).first();
      if (existingUser) {
        return done(null, existingUser);
      }
      const existingEmailAccount = User.query().where({ email: profile._json.email }).first();
      if (existingEmailAccount) {
        done();
      }
      const newUser = await User.query().insert({
        id: uuid.v4(),
        email: profile._json.email,
        password: 'password',
        github_id: profile.id,
        first_name: profile.displayName,
        avatar_url: profile._json.avatar_url,
        location: profile._json.location,
        website: profile._json.blog,
        verified: true
      });
      await newUser.$relatedQuery('role').relate({ id: 1 });
      await newUser.$relatedQuery('token').insert({
        id: uuid.v4(),
        oauth_token: accessToken,
        user_id: newUser.id
      });
      return done(newUser);
    }
  }));
}
