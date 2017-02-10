/* eslint-disable import/prefer-default-export */
import * as bcrypt from 'bcryptjs';

export async function generateHash() {
  const SALT = await bcrypt.genSaltSync(10);
  const randomString = () => Math.random().toString().substr(2, 8);
  const STRING = Array.from(new Array(5), randomString).join();
  return bcrypt.hashSync(STRING, SALT);
}
