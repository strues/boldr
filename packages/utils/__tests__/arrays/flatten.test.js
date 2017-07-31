import flatten from '../../src/arrays/flatten';

test('flatten condenses a nested array', () => {
  const inputArray = [[0, 1], [2, 3], [4, 5, [6, 7, [8, [9, 10]]]]];
  const outcome = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  expect(flatten(inputArray)).toEqual(outcome);
});
