import { spy } from 'sinon';
import { forEach, size } from './common';

describe('forEach test suite', () => {
  const obj = {
    1: 1,
    2: 2,
    3: 3,
  };
  const callback = spy();
  it('should return without calling callback for undefined objects', () => {
    expect.assertions(2);
    forEach(undefined, callback);
    expect(callback.callCount).toEqual(0);
    expect(callback.callCount).toEqual(0);
  });
  it('should call forEach for each defined key in an object', () => {
    expect.assertions(2);
    forEach(obj, callback);
    expect(callback.callCount).toEqual(3);
    expect(callback.callCount).toEqual(3);
  });
});

describe('size test suite', () => {
  it('should return undefined if both operands are undefined', () => {
    expect.assertions(1);
    expect(size()).toBeUndefined();
  });
  it('should return 0 for empty object', () => {
    expect.assertions(1);
    const obj = {};
    expect(size(obj)).toEqual(0);
  });
  it('should return count of values on a object', () => {
    expect.assertions(1);
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    expect(size(obj)).toEqual(3);
  });
});
