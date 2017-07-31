import uniqueArray from '../../src/arrays/uniqueArray';

test('uniqueArray combines two arrays without duplication', () => {
  const array1 = ['a', 'b', 'c'];
  const array2 = ['a', 'b', 'c', 'd'];
  const outcome = ['a', 'b', 'c', 'd'];
  expect(uniqueArray(array1, array2)).toEqual(outcome);
});
