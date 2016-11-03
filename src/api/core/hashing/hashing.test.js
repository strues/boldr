import { generateHash, SALT, randomString } from './hashing';

test('generateVerifyCode() - should generate a random token', () => {
  const token = generateHash();
  expect(typeof token).toBe('string');
});

test('SALT -- should generate a salt string', () => {
  const slt = SALT;
  expect(typeof slt).toBe('string');
});

test('randomString -- should generate a random string', () => {
  const rstring = randomString();
  expect(typeof rstring).toBe('string');
});
