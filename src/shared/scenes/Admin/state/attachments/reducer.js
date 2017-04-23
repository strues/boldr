import * as t from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  files: [],
  postImage: {},
  avatarImage: {},
  profileImage: {},
  currentFile: {},
};
/**
 * Attaachment Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function attachmentReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case t.GET_ATTACHMENT_REQUEST:
    case t.UPLOAD_ATTACHMENT_REQUEST:
    case t.DELETE_ATTACHMENT_REQUEST:
    case t.UPLOAD_POST_IMG_REQUEST:
    case t.UPLOAD_PROFILE_IMG_REQUEST:
    case t.UPLOAD_AVATAR_IMG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case t.GET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        files: action.payload,
      };
    case t.UPLOAD_ATTACHMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        files: [...state.files, action.payload],
      };
    case t.UPLOAD_POST_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        postImage: action.payload,
      };
    case t.UPLOAD_PROFILE_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        profileImage: action.payload,
      };
    case t.UPLOAD_AVATAR_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        avatarImage: action.payload,
      };
    case t.DELETE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        files: [...state.files].filter(file => file.id !== action.id),
      };
    case t.GET_ATTACHMENT_FAILURE:
    case t.UPLOAD_ATTACHMENT_FAILURE:
    case t.DELETE_ATTACHMENT_FAILURE:
    case t.UPLOAD_POST_IMG_FAILURE:
    case t.UPLOAD_PROFILE_IMG_FAILURE:
    case t.UPLOAD_AVATAR_IMG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case t.SELECT_FILE:
      return {
        ...state,
        currentFile: action.file,
      };
    default:
      return state;
  }
}
