import authReducer from './auth';

describe('Auth Duck', () => {
  it('Should return the initial state', () => {
    expect(
        authReducer(undefined, {})
      ).toEqual({
        isAuthenticated: false,
        error: null,
        isLoading: false,
        token: null,
        hydrated: true,
        user: {}
      });
  });
});
