import removeNil from '../../src/arrays/removeNil';

function ifElse(condition) {
// TODO: Allow the then/or to accept a function for lazy value resolving.
  return function ifElseResolver(then, or) {
    const execIfFuc = x => (typeof x === 'function' ? x() : x);
    return condition ? execIfFuc(then) : (or);
  };
}
const isDev = false;
const ifDev = ifElse(isDev);
test('flatten condenses a nested array', () => {
  const input = [
    ifDev('abc'),
    'cdb',
    'bbb',
  ];

  const outcome = ['cdb', 'bbb'];
  expect(removeNil(input)).toEqual(outcome);
});
