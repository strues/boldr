import { combineReducers } from 'redux';
import * as t from '../../actionTypes';

export const STATE_KEY = 'profile';

const INITIAL_PROFILE_STATE = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  location: '',
  avatarUrl: '',
  profileImage: '',
  social: {},
  website: '',
  bio: '',
  role: '',
  roleId: '',
};

const current = (state = INITIAL_PROFILE_STATE, action) => {
  switch (action.type) {
    case t.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        avatarUrl: action.payload.avatar_url,
        profileImage: action.payload.profile_image,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
        role: action.payload.roles[0].name,
        roleId: action.payload.roles[0].id,
      };
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_PROFILE_REQUEST:

      return true;
    case t.FETCH_PROFILE_SUCCESS:
    case t.FETCH_PROFILE_FAILURE:

      return false;
    default:
      return state;
  }
};


/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */


export default combineReducers({
  current,
  isFetching,
});
