import { notificationSend } from '../../notifications/notifications';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import * as t from './constants';

const loadMembers = () => ({
  type: t.LOAD_MEMBERS_REQUEST,
});

const loadMembersSuccess = (response) => {
  return {
    type: t.LOAD_MEMBERS_SUCCESS,
    payload: response.body,
  };
};

// Fail receivers
const failedToLoadMembers = (err) => ({
  type: t.LOAD_MEMBERS_FAILURE,
  loading: false,
  error: err,
});

// Public action creators
export function loadSiteMembers() {
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
    type: t.MEMBER_SELECTED,
    id: userId,
  };
}
