import addIdToArray from '../../src/arrays/addIdToArray';

test('addIdToArray adds an id to the array of ids', () => {
  const ids = ['ab123', 'def324'];
  const outcome = ['ab123', 'def324', 'cbd321'];
  expect(addIdToArray(ids, 'cbd321')).toEqual(outcome);
});
