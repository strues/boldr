import { notificationSend } from 'state/dux/notifications';
import * as api from 'core/services/api';
import * as notif from 'core/config/notifications';

export const CREATE_PAGE_REQUEST = '@boldr/dashboard/pages/CREATE_PAGE_REQUEST';
export const CREATE_PAGE_SUCCESS = '@boldr/dashboard/pages/CREATE_PAGE_SUCCESS';
export const CREATE_PAGE_FAILURE = '@boldr/dashboard/pages/CREATE_PAGE_FAILURE';

const beginCreatePage = () => {
  return { type: CREATE_PAGE_REQUEST };
};

const doneCreatePage = (response) => {
  return { type: CREATE_PAGE_SUCCESS };
};

const failCreatePage = (err) => {
  return {
    type: CREATE_PAGE_FAILURE,
    error: err,
  };
};

export function createPage(payload) {
  return dispatch => {
    dispatch(beginCreatePage());
    return api.doCreatePage(payload)
      .then(response => {
        dispatch(doneCreatePage(response));
        dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_SUCCESS));
      })
      .catch(
        err => {
          dispatch(failCreatePage(err.message));
          dispatch(notificationSend(notif.MSG_UPDATE_MEMBER_ERROR));
        });
  };
}

const INITIAL_STATE = {
  loaded: false,
  loading: false,
  error: null,
};

function pageBuilderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PAGE_SUCCESS:
      return {
        ...state,
      };
    case CREATE_PAGE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default pageBuilderReducer;
