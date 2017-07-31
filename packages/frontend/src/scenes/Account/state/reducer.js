import * as t from './actionTypes';

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null,
  info: null,
};

/**
 * Auth Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
function authReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case t.LOGIN_FAILURE:
    case t.SIGNUP_USER_FAILURE:
    case t.CHECK_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
        error: action.error,
      };
    case t.LOGIN_REQUEST:
    case t.CHECK_AUTH_REQUEST:
    case t.SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        info: action.info,
      };
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        info: {
          id: action.user.id,
          email: action.user.email,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          username: action.user.username,
          avatarUrl: action.user.avatarUrl,
          profileImage: action.user.profileImage,
          location: action.user.location,
          bio: action.user.bio,
          website: action.user.website,
          socialMedia: action.user.socialMedia,
          role: action.user.roles[0].name,
          roleId: action.user.roles[0].id,
        },
      };
    case t.LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
      };

    case t.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
