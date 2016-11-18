import { generateHash } from './hashing';

test('generateVerifyCode() - should generate a random token', () => {
  const token = generateHash();
  expect(typeof token).toBe('object');
});
