import passport from 'passport';
import * as objection from 'objection';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import uuid from 'node-uuid';
import Token from '../../token/token.model';
import Profile from '../../profile/profile.model';
import { responseHandler, generateHash } from '../../../core';
const config = require('../../../core/config/config');


const strategyOpts = {
  clientID: conf.get('social.facebook.id'),
  clientSecret: conf.get('social.facebook.secret'),
  callbackURL: '/api/v1/auth/facebook/callback',
  passReqToCallback: true,
};

export default function configureGoogle(Account) {
  passport.use(new GoogleStrategy(strategyOpts, async (req, res, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      const existingAccount = await Account.query().where({ google_id: profile._json.id }).first();
      if (existingAccount) {
        done();
      } else {
        const account = await Account.query().findById(req.user.id);
        account.google_id = profile._json.id;
        account.email = profile.emails[0].value;

        await account.$relatedQuery('profile').insert({
          first_name: profile.displayName,
          avatar_url: account.avatar_url || `https://graph.facebook.com/${profile.id}/picture?type=large`,
        });
        account.save((err) => {
          res.send('Facebook account has been linked.');
          done(err, account);
        });
      }
    } else {
      const existingAccount = await Account.query().where({ google_id: profile._json.id }).first();
      if (existingAccount) {
        return done(null, existingAccount);
      }
      const existingEmailAccount = Account.query().where({ email: profile._json.email }).first();
      if (existingEmailAccount) {
        done();
      }

      const newAccount = await objection.transaction(Account, async (Account) => {
        const account = await Account
            .query()
            .insert({
              id: uuid.v4(),
              email: profile.emails[0].value,
            });
        await account.$relatedQuery('role').relate({ id: 1 });

        if (!account) {
          res.status(500).json('Oooops');
        }
        // here we create the profile
        // only inserting the uuid because creating the account doesnt require any of the data
        // you would find in the profile.
        const profile = await account.$relatedQuery('profile').insert({
          id: uuid.v4(),
          first_name: profile.displayName,
          avatar_url: account.avatar_url || `https://graph.facebook.com/${profile.id}/picture?type=large`,
        });
        if (!profile) {
          res.status(500).json('Oooops');
        }
      });
      return res.status(200).json(newAccount);
    }
  }));
}
