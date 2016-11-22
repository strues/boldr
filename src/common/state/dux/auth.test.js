import authReducer, { LOGIN_REQUEST, LOGIN_FAILURE } from './auth';

describe('Auth Duck', () => {
  it('Should return the initial state', () => {
    expect(
        authReducer(undefined, {}),
      ).toEqual({
        isAuthenticated: false,
        error: null,
        loading: false,
        token: null,
        hydrated: true,
        user: {},
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      hydrated: true,
      user: {},
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      hydrated: true,
      user: {},
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle failed login', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      hydrated: true,
      user: {},
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: null,
      hydrated: true,
      user: {},
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
