import { normalize, arrayOf } from 'normalizr';
import { camelizeKeys } from 'humps';
import * as api from '../../../../core/api';
import { menu as menuSchema } from '../../../../core/schemas';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from './constants';

export function fetchMenus() {
  return dispatch => {
    dispatch(beginFetchMenus());
    return api.getAllNavs()
      .then(response => {
        const camelizeThis = response.body;
        const camelizedJson = camelizeKeys(camelizeThis);
        const normalized = normalize(camelizedJson, arrayOf(menuSchema));
        return dispatch(fetchMenusSuccess(normalized));
      })
      .catch(error => {
        dispatch(fetchMenusError(error));
      });
  };
}
export function fetchMenusIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMenus(getState())) {
      return dispatch(fetchMenus());
    }

    return Promise.resolve();
  };
}

function shouldFetchMenus(state) {
  const menu = state.boldr.menu.labels;
  if (!menu.length) {
    return true;
  }
  if (menu.length) {
    return false;
  }
  return menu;
}

function beginFetchMenus() {
  return {
    type: t.FETCH_MENUS_REQUEST,
  };
}
function fetchMenusError(error) {
  return {
    type: t.FETCH_MENUS_FAILURE,
    error,
  };
}

function fetchMenusSuccess(normalized) {
  return {
    type: t.FETCH_MENUS_SUCCESS,
    payload: normalized,
  };
}

export function updateMenuDetails(data) {
  return dispatch => {
    dispatch(beginUpdateMenuDetails());
    return api.doUpdateMenuDetails(data)
      .then(response => {
        dispatch(updateMenuDetailsSuccess(response));
        dispatch(notificationSend(notif.MSG_UPDATE_LINK_SUCCESS));
      })
      .catch(
        err => {
          dispatch(updateMenuDetailsFailure(err.message));
          dispatch(notificationSend(notif.MSG_UPDATE_LINK_ERROR));
        });
  };
}

function beginUpdateMenuDetails() {
  return {
    type: t.UPDATE_MENU_REQUEST,
  };
}

function updateMenuDetailsSuccess(response) {
  return {
    type: t.UPDATE_MENU_SUCCESS,
    payload: response,
  };
}

function updateMenuDetailsFailure(err) {
  return {
    type: t.UPDATE_MENU_FAILURE,
    error: err,
  };
}


export function addMenuDetail(data) {
  return dispatch => {
    dispatch(beginAddMenuDetail());
    return api.doAddNavigationLinks(data)
      .then(response => {
        if (!response.status === 201) {
          dispatch(addMenuDetailFailure('Error'));
          dispatch(notificationSend(notif.MSG_ADD_LINK_ERROR));
        }
        dispatch(addMenuDetailSuccess(response));
        dispatch(notificationSend(notif.MSG_ADD_LINK_SUCCESS));
      });
  };
}

const beginAddMenuDetail = () => {
  return { type: t.ADD_MENU_DETAIL_REQUEST };
};

const addMenuDetailSuccess = (response) => {
  return {
    type: t.ADD_MENU_DETAIL_SUCCESS,
    payload: response.body,
  };
};

const addMenuDetailFailure = (err) => {
  return {
    type: t.ADD_MENU_DETAIL_FAILURE,
    error: err,
  };
};
