import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { transaction } from 'objection';
import { comparePassword } from '../../services/hashing';
import signToken from '../../services/authentication/signToken';
import config from '../../config';
import User from '../../models/User';

import { mailer, generateHash } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import VerificationToken from '../../models/VerificationToken';
import { BadRequest } from '../../core/errors';

export default class UsersConnector {
  static loginUser(args) {
    return new Promise((resolve, reject) => {
      // Validate the data
      if (!args.email) {
        return reject({
          code: 'email.empty',
          message: 'Email is empty.',
        });
      }

      if (!args.password) {
        return reject({
          code: 'password.empty',
          message: 'You have to provide a password.',
        });
      }

      // Find the user
      return User.query()
        .where({ email: args.email })
        .eager('[roles]')
        .skipUndefined()
        .first()
        .then(user => {
          if (!user) {
            return reject({
              code: 'user.not_found',
              message: 'Authentication failed. User not found.',
            });
          }

          return comparePassword(
            user.password,
            args.password,
            (err, isMatch) => {
              if (err) {
                return reject(err);
              }
              if (!isMatch) {
                return reject({
                  code: 'password.wrong',
                  message: 'Wrong password.',
                });
              }

              return resolve(signToken(user));
            },
          );
        })
        .catch(err => reject(err));
    });
  }
  static registerUser(args) {
    return new Promise((resolve, reject) => {
      // Validate the data
      if (!args.email) {
        return reject({
          code: 'email.empty',
          message: 'Email is empty.',
        });
      }

      if (!args.password) {
        return reject({
          code: 'password.empty',
          message: 'You have to provide a password.',
        });
      }

      // Find the user
      return User.query()
        .saveAndFetch(args)
        .then(user => {
          if (!user) {
            return reject({
              code: 'user.conflict',
              message: 'A user with this information already exists.',
            });
          }
          user.$relatedQuery('roles').relate({ id: 1 });
          // generate user verification token to send in the email.
          const verifToken = uuid.v4();
          // get the mail template
          const mailBody = welcomeEmail(verifToken);
          // subject
          const mailSubject = 'Boldr User Verification';
          // send the welcome email
          mailer(user, mailBody, mailSubject);
          // create a relationship between the user and the token
          user.$relatedQuery('verificationToken').insert({
            token: verifToken,
            userId: user.id,
          });

          return resolve(user);
        })
        .catch(err => reject(err));
    });
  }
}
