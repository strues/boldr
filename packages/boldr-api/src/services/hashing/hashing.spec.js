import { generateHash } from './hashing';

it('generateVerifyCode() - should generate a random token', () => {
  const token = generateHash();
  expect(typeof token).toBe('string');
});
