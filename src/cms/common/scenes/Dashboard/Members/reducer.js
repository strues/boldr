import { notificationSend } from 'state/dux/notifications';
import * as api from 'core/services/api';
import * as notif from 'core/config/notifications';

const LOAD_MEMBERS_REQUEST = '@boldr/dashboard/members/LOAD_MEMBERS_REQUEST';
const LOAD_MEMBERS_SUCCESS = '@boldr/dashboard/members/LOAD_MEMBERS_SUCCESS';
const LOAD_MEMBERS_FAILURE = '@boldr/dashboard/members/LOAD_MEMBERS_FAILURE';
const UPDATE_MEMBER_REQUEST = '@boldr/dashboard/members/UPDATE_MEMBER_REQUEST';
const UPDATE_MEMBER_SUCCESS = '@boldr/dashboard/members/UPDATE_MEMBER_SUCCESS';
const UPDATE_MEMBER_FAILURE = '@boldr/dashboard/members/UPDATE_MEMBER_FAILURE';
const MEMBER_SELECTED = '@boldr/dashboard/members/MEMBER_SELECTED';

const loadMembers = () => ({
  type: LOAD_MEMBERS_REQUEST,
});

const loadMembersSuccess = (response) => {
  return {
    type: LOAD_MEMBERS_SUCCESS,
    payload: response.body,
  };
};

// Fail receivers
const failedToLoadMembers = (err) => ({
  type: LOAD_MEMBERS_FAILURE,
  loading: false,
  error: err,
});

// Public action creators
export function loadSiteMembers() {
  return dispatch => {
    dispatch(loadMembers());
    return api.doFetchMembers()
      .then(response => {
        if (response.status !== 200) {
          dispatch(failedToLoadMembers());
        }
        dispatch(loadMembersSuccess(response));
      })
      .catch(err => {
        dispatch(failedToLoadMembers(err));
      });
  };
}

const beginUpdateMember = () => {
  return { type: UPDATE_MEMBER_REQUEST };
};

const doneUpdateMember = (response) => {
  return { type: UPDATE_MEMBER_SUCCESS };
};

const failUpdateMember = (err) => {
  return {
    type: UPDATE_MEMBER_FAILURE,
    error: err,
  };
};

export function updateMember(userData) {
  return dispatch => {
    dispatch(beginUpdateMember());
    return api.doUpdateMember(userData)
      .then(response => {
        dispatch(doneUpdateMember(response));
        dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_SUCCESS));
      })
      .catch(
        err => {
          dispatch(failUpdateMember(err.message));
          dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_ERROR));
        });
  };
}

export function memberSelected(userId) {
  return {
    type: MEMBER_SELECTED,
    id: userId,
  };
}

const INITIAL_STATE = {
  loading: false,
  members: [],
  error: null,
  selected: {},
};

function membersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_MEMBERS_REQUEST:
    case UPDATE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
      };
    case LOAD_MEMBERS_FAILURE:
    case UPDATE_MEMBER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
      };
    case MEMBER_SELECTED:
      return {
        ...state,
        selected: state.members.filter((member) => member.id === action.id),
      };
    default:
      return state;
  }
}

export default membersReducer;
