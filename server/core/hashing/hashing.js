/* eslint-disable import/prefer-default-export */
import * as bcrypt from 'bcryptjs';
import base64url from 'base64url';

export async function generateHash() {
  const SALT = await bcrypt.genSaltSync(10);
  const randomString = () => Math.random().toString().substr(2, 8);
  const STRING = Array.from(new Array(5), randomString).join();
  return bcrypt.hashSync(STRING, SALT);
}

/**
 * Generate a secured token that works inside URLs
 * http://stackoverflow.com/a/25690754
 */
export const generateURLSafeToken = size => base64url(generateHash(size));
