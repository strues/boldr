import { removeNullandUndef } from './transform';

const fakeData = {
  id: 1,
  user: 'abc',
  value: 'abcd',
  empty: undefined,
  empty2: undefined,
};
const expectedData = {
  id: 1,
  user: 'abc',
  value: 'abcd',
};

test('+++ removeNullandUndef -- removes empty from the response', () => {
  expect(removeNullandUndef(fakeData)).toEqual(expectedData);
});
