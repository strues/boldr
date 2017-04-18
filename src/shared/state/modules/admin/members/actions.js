import api from '../../../../core/api';
import {notificationSend} from '../../notifications/notifications';
import * as notif from '../../../../core/constants';
import * as t from '../../actionTypes';

/**
  * FETCH MEMBERS ACTIONS
  * -------------------------
  * @exports fetchMembers
  *****************************************************************/
export const fetchMembers = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({type: t.LOAD_MEMBERS_REQUEST});

  return axios
    .get('/api/v1/users?include=[roles]')
    .then(res => {
      dispatch({
        type: t.LOAD_MEMBERS_SUCCESS,
        payload: res.data.results,
      });
    })
    .catch(err => {
      dispatch({
        type: t.LOAD_MEMBERS_FAILURE,
        error: err,
      });
    });
};
/* istanbul ignore next */
export const fetchMembersIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchMembers(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchMembers(axios));
  }

  /* istanbul ignore next */
  return null;
};

function shouldFetchMembers(state) {
  const {members} = state.admin.members;
  if (!members.length) {
    return true;
  }
  return false;
}

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
      .put(`/api/v1/users/admin/${userData.id}`, data)
      .then(res => {
        dispatch(doneUpdateMember(res));
        dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_SUCCESS));
      })
      .catch(err => {
        dispatch(failUpdateMember(err.message));
        dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_ERROR));
      });
  };
}

const beginUpdateMember = () => {
  return {type: t.UPDATE_MEMBER_REQUEST};
};

const doneUpdateMember = res => {
  return {
    type: t.UPDATE_MEMBER_SUCCESS,
    payload: res.data,
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

export function memberSelected(userId) {
  return {
    type: t.MEMBER_SELECTED,
    id: userId,
  };
}
