import passport from 'passport';
import uuid from 'node-uuid';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import Token from '../../token/token.model';
import Profile from '../../profile/profile.model';
import { responseHandler, generateHash } from '../../../core';
const config = require('../../../core/config/config');


const strategyOpts = {
  clientID: conf.get('social.facebook.id'),
  clientSecret: conf.get('social.facebook.secret'),
  callbackURL: '/api/v1/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
};

export default function configureFacebook(Account) {
  passport.use(new FacebookStrategy(strategyOpts, async (req, res, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      const existingAccount = await Account.query().where({ facebook_id: profile.id }).first();
      if (existingAccount) {
        done();
      } else {
        const account = await Account.query().findById(req.user.id);
        account.facebook_id = profile.id;
        await account.$relatedQuery('token').insert({
          id: uuid.v4(),
          account_verification_token: accessToken,
          account_id: account.id,
        });

        await account.$relatedQuery('profile').insert({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          avatar_url: account.avatar_url || `https://graph.facebook.com/${profile.id}/picture?type=large`,
        });
        account.save((err) => {
          res.send('Facebook account has been linked.');
          done(err, account);
        });
      }
    } else {
      const existingAccount = await Account.query().where({ facebook_id: profile.id }).first();
      if (existingAccount) {
        return done(null, existingAccount);
      }
      const existingEmailAccount = Account.query().where({ email: profile._json.email }).first();
      if (existingEmailAccount) {
        done();
      }
      // const account = new Account();
      // user.email = profile._json.email;
      // user.facebook_id = profile.id;
      // user.account_token = accessToken;
      // user.first_name = profile.name.givenName;
      // user.last_name = profile.name.familyName;
      // user.avatar_url = user.avatar_url || `https://graph.facebook.com/${profile.id}/picture?type=large`;
      // user.location = (profile._json.location) ? profile._json.location.name : '';
      // user.save((err) => {
      //   done(err, user);
      // });
    }
  }));
}
