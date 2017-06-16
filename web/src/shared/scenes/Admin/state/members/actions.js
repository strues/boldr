
import { sendNotification } from '../../../../state/modules/notifications/notifications';

import api, { API_PREFIX } from '../../../../core/api';

import * as notif from '../../../../core/constants';

import * as t from '../actionTypes';

/**
  * UPDATE MEMBER ACTIONS
  * -------------------------
  * @exports updateMember
  *****************************************************************/

export function updateMember(userData) {
  const data = {
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatarUrl: userData.avatarUrl,
    role: userData.role,
  };
  return dispatch => {
    dispatch(beginUpdateMember());
    return api
      .put(`${API_PREFIX}/users/admin/${userData.id}`, data)
      .then(res => {
        const updatedUser = res.data;
        const normalizedUser = updatedUser;
        dispatch(doneUpdateMember(normalizedUser));
        return dispatch(sendNotification(notif.MSG_UPDATE_MEMBER_SUCCESS));
      })
      .catch(err => {
        dispatch(failUpdateMember(err.message));
        dispatch(sendNotification(notif.MSG_UPDATE_MEMBER_ERROR));
      });
  };
}

const beginUpdateMember = () => {
  return { type: t.UPDATE_MEMBER_REQUEST };
};

const doneUpdateMember = normalizedUser => {
  return {
    type: t.UPDATE_MEMBER_SUCCESS,
    payload: normalizedUser,
  };
};

const failUpdateMember = err => {
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

export function memberSelected(user) {
  return {
    type: t.MEMBER_SELECTED,
    payload: user,
  };
}
