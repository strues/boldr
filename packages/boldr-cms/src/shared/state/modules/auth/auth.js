import * as t from './constants';
/**
 * INITIAL STATE
 */
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null,
  hydrated: false,
  user: {},
};

/**
 * Auth Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function authReducer(state = INITIAL_STATE, action = {}) {
  if (!state.hydrated) {
    state = Object.assign({}, INITIAL_STATE, state, { hydrated: true });
  }
  switch (action.type) {
    case t.LOGIN_FAILURE:
    case t.FORGOT_PASSWORD_FAILURE:
    case t.SIGNUP_USER_FAILURE:
    case t.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.error,
      };
    case t.LOGIN_REQUEST:
    case t.CHECK_AUTH_REQUEST:
    case t.SIGNUP_USER_REQUEST:
    case t.FORGOT_PASSWORD_REQUEST:
    case t.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case t.LOGIN_SUCCESS:
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
      };
    case t.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
        user: '',
      };
    case t.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case t.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case t.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
