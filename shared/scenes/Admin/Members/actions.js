import { notificationSend } from '../../../state/modules/notifications/notifications';
import * as api from '../../../core/api';
import * as notif from '../../../core/constants';
import * as t from './constants';

/**
  * FETCH MEMBERS ACTIONS
  * -------------------------
  * @exports loadSiteMembers
  *****************************************************************/

export function fetchMembers() {
  return dispatch => {
    dispatch(loadMembers());
    return api.getAllMembers()
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
export function loadSiteMembers() {
  return (dispatch, getState) => {
    if (shouldFetchMembers(getState())) {
      return dispatch(fetchMembers());
    }

    return Promise.resolve();
  };
}
function shouldFetchMembers(state) {
  const members = state.members.members;
  if (!members.length) {
    return true;
  }
  if (members.length) {
    return false;
  }
  return members;
}
const loadMembers = () => ({
  type: t.LOAD_MEMBERS_REQUEST,
});

const loadMembersSuccess = (response) => {
  return {
    type: t.LOAD_MEMBERS_SUCCESS,
    payload: response.body,
  };
};

const failedToLoadMembers = (err) => ({
  type: t.LOAD_MEMBERS_FAILURE,
  loading: false,
  error: err,
});

/**
  * UPDATE MEMBER ACTIONS
  * -------------------------
  * @exports updateMember
  *****************************************************************/

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

const beginUpdateMember = () => {
  return { type: t.UPDATE_MEMBER_REQUEST };
};

const doneUpdateMember = (response) => {
  return { type: t.UPDATE_MEMBER_SUCCESS, payload: response };
};

const failUpdateMember = (err) => {
  return {
    type: t.UPDATE_MEMBER_FAILURE,
    error: err,
  };
};

/**
  * SELECT MEMBER ACTIONS
  * -------------------------
  * @exports memberSelected
  *****************************************************************/

export function memberSelected(userId) {
  return {
    type: t.MEMBER_SELECTED,
    id: userId,
  };
}
