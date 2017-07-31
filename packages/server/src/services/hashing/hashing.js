/* eslint-disable import/prefer-default-export */
import Promise from 'bluebird';
import Bcrypt from 'bcryptjs';

const bcrypt = Promise.promisifyAll(Bcrypt);

export function generateHash() {
  const SALT = bcrypt.genSaltSync(10);
  const randomString = () => Math.random().toString().substr(2, 8);
  const STRING = Array.from(new Array(5), randomString).join();
  return bcrypt.hashSync(STRING, SALT);
}

export const comparePassword = (currentPassword, candidatePassword, callback) =>
  bcrypt.compare(candidatePassword, currentPassword, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
