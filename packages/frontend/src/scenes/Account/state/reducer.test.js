import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_FAILURE,
  SIGNUP_USER_SUCCESS,
  LOGOUT,
} from './actionTypes';
import authReducer from './reducer';

describe('Auth Reducer', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      info: null,
    });
  });
  it('should handle LOGIN_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle LOGIN_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle CHECK_AUTH_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: CHECK_AUTH_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle CHECK_AUTH_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: CHECK_AUTH_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle LOGOUT', () => {
    const initialState = {
      isAuthenticated: true,
      error: null,
      loading: false,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiJiYTFhYzQyNy03NWExLTQ3YTItODg4My1iZWExODQ4MmViNzgiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAzNjgwMDA0fQ.k0JflNTqhO5aojo8LprXAqk_WgyzrJ23OjqQlvLoI7w',
      info: {
        firstName: 'First',
        lastName: 'Name',
        email: 'email@boldr.io',
        username: 'username',
        avatarUrl: 'https://boldr.io/image.png',
        role: 'Admin',
        roleId: 4,
      },
    };
    const stateAfter = {
      loading: false,
      error: null,
      isAuthenticated: false,
      token: '',
      info: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        avatarUrl: '',
        role: '',
        roleId: null,
      },
    };
    expect(
      authReducer(initialState, {
        type: LOGOUT,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_SUCCESS', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: '',
      info: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: '',
      info: null,
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_SUCCESS,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle LOGIN_SUCCESS', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: '',
      info: null,
    };
    const stateAfter = {
      isAuthenticated: true,
      error: null,
      loading: false,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiJiYTFhYzQyNy03NWExLTQ3YTItODg4My1iZWExODQ4MmViNzgiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAzNjgwMDA0fQ.k0JflNTqhO5aojo8LprXAqk_WgyzrJ23OjqQlvLoI7w',
      info: {
        firstName: 'First',
        lastName: 'Name',
        email: 'email@boldr.io',
        username: 'username',
        avatarUrl: 'https://boldr.io/image.png',
        role: 'Admin',
        roleId: 4,
      },
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJib2xkciIsInN1YmplY3QiOiIxYjA2MmUyNi1kZjcxLTQ4Y2UtYjM2My00YWU5Yjk2NmU3YTAiLCJqdGkiOiJiYTFhYzQyNy03NWExLTQ3YTItODg4My1iZWExODQ4MmViNzgiLCJleHBpcmVzSW4iOiI3IGRheXMiLCJlbWFpbCI6ImFkbWluQGJvbGRyLmlvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTAzNjgwMDA0fQ.k0JflNTqhO5aojo8LprXAqk_WgyzrJ23OjqQlvLoI7w',
        info: {
          firstName: 'First',
          lastName: 'Name',
          email: 'email@boldr.io',
          username: 'username',
          avatarUrl: 'https://boldr.io/image.png',
          role: 'Admin',
          roleId: 4,
        },
      }),
    ).toEqual(stateAfter);
  });
});
