/* eslint-disable import/prefer-default-export */
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

export function generateHash() {
  const SALT = bcrypt.genSaltSync(10);
  const randomString = () => Math.random().toString().substr(2, 8);
  const STRING = Array.from(new Array(5), randomString).join();
  return bcrypt.hashSync(STRING, SALT);
}
