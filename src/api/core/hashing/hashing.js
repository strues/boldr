/* eslint-disable import/prefer-default-export */
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';

export const SALT = bcrypt.genSaltSync(10);
export const randomString = () => Math.random().toString().substr(2, 8);

function generateHash() {
  const content = Array.from(new Array(5), randomString).join();
  return CryptoJS.HmacSHA256(content, SALT).toString();
}

export { generateHash };
