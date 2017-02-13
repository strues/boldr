import { LOGIN_REQUEST, LOGIN_FAILURE } from '../../actionTypes';
import authReducer from './reducer';

describe('Auth Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        authReducer(undefined, {}),
      ).toEqual({
        isAuthenticated: false,
        error: null,
        loading: false,
        token: null,
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle loading failure', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
