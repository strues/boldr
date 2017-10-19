/**
 * @jest-environment node
 */

import normalizePort from './normalizePort';

describe('normalizePort', () => {
  it('should convert a string', () => {
    const testPort = '10';
    expect(normalizePort(testPort)).toEqual(10);
  });
});
