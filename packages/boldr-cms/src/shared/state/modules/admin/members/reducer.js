import * as t from '../../actionTypes';

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
