import * as t from './constants';

export const STATE_KEY = 'members';

const INITIAL_STATE = {
  loaded: false,
  loading: false,
  members: [],
  error: null,
  selected: {},
};

function membersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.LOAD_MEMBERS_REQUEST:
    case t.UPDATE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case t.LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
      };
    case t.LOAD_MEMBERS_FAILURE:
    case t.UPDATE_MEMBER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case t.UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
      };
    case t.MEMBER_SELECTED:
      return {
        ...state,
        selected: state.members.filter(member => member.id === action.id),
      };
    default:
      return state;
  }
}

export default membersReducer;
//
//
// const all = (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_MEDIAS_SUCCESS:
//     case EDIT_MEDIA_SUCCESS:
//       return {
//         ...state,
//         ...action.payload.entities.media,
//       };
//
//     default:
//       return state;
//   }
// };
//
// const ids = (state = [], action) => {
//   switch (action.type) {
//     case FETCH_MEDIAS_SUCCESS:
//     case EDIT_MEDIA_SUCCESS:
//       return action.payload.result;
//     default:
//       return state;
//   }
// };
//
// const isFetching = (state = false, action) => {
//   switch (action.type) {
//     case FETCH_MEDIAS_REQUEST:
//     case EDIT_MEDIA_REQUEST:
//       return true;
//     case FETCH_MEDIAS_SUCCESS:
//     case FETCH_MEDIAS_FAILURE:
//     case EDIT_MEDIA_SUCCESS:
//     case EDIT_MEDIA_FAILURE:
//       return false;
//     default:
//       return state;
//   }
// };
//
// const currentMedia = (state = {}, action) => {
//   switch (action.type) {
//     case SELECT_MEDIA:
//       return {
//         ...state,
//         ...action.file,
//       };
//     default:
//       return state;
//   }
// };
//
// export default combineReducers({
//   all,
//   ids,
//   isFetching,
//   currentMedia,
// });
