import stringifiedArray from '../../src/arrays/stringifiedArray';

test('stringifiedArray converts an array to strings', () => {
  const nums = [1, 2, 3, 4];
  const outcome = ['1', '2', '3', '4'];
  expect(stringifiedArray(nums)).toEqual(outcome);
});
