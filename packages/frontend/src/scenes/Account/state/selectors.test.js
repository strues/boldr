import { selectAuth, selectCurrentUser, selectToken } from './selectors';

describe('auth selectors', () => {
  test('should select the auth state', () => {
    const authState = {};
    const mockedState = {
      auth: authState,
    };
    expect(selectAuth(mockedState)).toEqual(authState);
  });
  test('should select the currentUser', () => {
    const authState = {};
    const userSelector = selectCurrentUser();
    const mockedState = {
      auth: {
        info: authState,
      },
    };
    expect(userSelector(mockedState)).toEqual(authState);
  });
  test('should select the token', () => {
    const authState = {};
    const tokenSelect = selectToken();
    const mockedState = {
      auth: {
        token: authState,
      },
    };
    expect(tokenSelect(mockedState)).toEqual(authState);
  });
});
