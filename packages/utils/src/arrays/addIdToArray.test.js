import addIdToArray from './addIdToArray';

test('it should add an to the end of the array.', () => {
  const ids = ['ab123', 'def324'];
  const outcome = ['ab123', 'def324', 'cbd321'];
  expect(addIdToArray(ids, 'cbd321')).toEqual(outcome);
});
