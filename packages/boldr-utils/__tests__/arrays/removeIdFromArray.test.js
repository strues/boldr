import removeIdFromArray from '../../src/arrays/removeIdFromArray';

test('removeIdFromArray removes an id from the array of ids', () => {
  const ids = ['ab123', 'cbd321', 'def324'];
  const outcome = ['ab123', 'def324'];
  expect(removeIdFromArray(ids, 'cbd321')).toEqual(outcome);
});
