import validateArray from '../../src/arrays/validateArray';

test('validateArray determines if an array is an array', () => {
  const array1 = ['a', 'b', 'c'];
  // const outcome = ['a', 'b', 'c', 'd'];
  expect(validateArray(array1)).toBe(undefined);
});
