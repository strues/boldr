import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signToken from '../../services/authentication/signToken';
import config from '../../config';
import User from '../../models/user';

const comparePassword = (currentPassword, candidatePassword, callback) =>
  bcrypt.compare(candidatePassword, currentPassword, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });

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
}
