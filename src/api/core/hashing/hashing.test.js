import test from 'ava';
import { generateHash } from './hashing';

test('generateVerifyCode() - should generate a random token', (t) => {
  const token = generateHash();
  t.is(typeof token, 'object');
});
