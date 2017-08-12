import toTitle from '../src/strings/toTitle';

test('toTitle should title case a string', () => {
  expect(toTitle('hello')).toEqual('Hello');
});
