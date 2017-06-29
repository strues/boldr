import { selectAuth } from './selectors';

test('should select the boldr state', () => {
  const authState = {};
  const mockedState = {
    auth: authState,
  };
  expect(selectAuth(mockedState)).toEqual(authState);
});
