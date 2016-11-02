import { expect } from 'chai';
import { generateHash, SALT, randomString } from './hashing';

describe('Hashing -- generateVerifyCode()', () => {
  it('should generate a random token', () => {
    const token = generateHash();
    expect(token).to.be.a('string');
  });
});

describe('Hashing -- SALT', () => {
  it('should generate a salt string', () => {
    const slt = SALT;
    expect(slt).to.be.a('string');
  });
});

describe('Hashing -- randomString', () => {
  it('should generate a random string', () => {
    const rstring = randomString();
    expect(rstring).to.be.a('string');
  });
});
