import toTitle from './toTitle';

test('toTitle should title case a string', () => {
  expect(toTitle('hello')).toEqual('Hello');
});
