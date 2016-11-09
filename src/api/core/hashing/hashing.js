/* eslint-disable import/prefer-default-export */
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';

const config = require('../../config/config');

export const SALT = bcrypt.genSaltSync(config.get('salt_rounds'));
export const randomString = () => Math.random().toString().substr(2, 8);

function generateHash() {
  const content = Array.from(new Array(5), randomString).join();
  return CryptoJS.HmacSHA256(content, SALT).toString();
}

export { generateHash };
