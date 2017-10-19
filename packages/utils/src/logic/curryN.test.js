/**
 * @jest-environment node
 */
import curryN from './curryN';

describe('curryN', () => {
  it('should find numbers via curry', () => {
    let match = curryN(function(expr, str) {
      return str.match(expr);
    });

    let hasNumber = match(/[0-9]+/);

    let filter = curryN(function(f, ary) {
      return ary.filter(f);
    });

    let findNumbersInArray = filter(hasNumber);

    expect(findNumbersInArray(['js', 'number1'])).toEqual(['number1']);
  });
});
