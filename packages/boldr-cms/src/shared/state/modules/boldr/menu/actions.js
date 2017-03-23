import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';
import { detail, menu } from './schema';

/**
  * FETCH MENUS ACTIONS
  * -------------------------
  * @exports fetchMenusIfNeeded
  * @exports fetchMenus
  *****************************************************************/

export function fetchMenusIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMenus(getState())) {
      return dispatch(fetchMenus());
    }

    return Promise.resolve();
  };
}

export function fetchMenus() {
  return dispatch => {
    dispatch(beginFetchMenus());
    return api
      .getMainNav()
      .then(response => {
        const menuData = response.body;
        return dispatch(fetchMenusSuccess(menuData));
      })
      .catch(error => {
        dispatch(fetchMenusError(error));
      });
  };
}

function shouldFetchMenus(state) {
  const menu = state.boldr.menu.main.details;
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
    type: t.GET_MAIN_MENU_REQUEST,
  };
}

function fetchMenusError(error) {
  return {
    type: t.GET_MAIN_MENU_FAILURE,
    error,
  };
}

function fetchMenusSuccess(menuData) {
  return {
    type: t.GET_MAIN_MENU_SUCCESS,
    payload: menuData,
  };
}

/**
  * UPDATE MENU DETAIL ACTIONS
  * -------------------------
  * @exports updateMenuDetails
  *****************************************************************/

export function updateMenuDetails(data) {
  return dispatch => {
    dispatch(beginUpdateMenuDetails());
    return api
      .doUpdateMenuDetails(data)
      .then(response => {
        dispatch(updateMenuDetailsSuccess(response));
        dispatch(notificationSend(notif.MSG_UPDATE_LINK_SUCCESS));
      })
      .catch(err => {
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
    payload: response.body,
  };
}

function updateMenuDetailsFailure(err) {
  return {
    type: t.UPDATE_MENU_FAILURE,
    error: err,
  };
}

/**
  * ADD MENU DETAIL ACTIONS
  * -------------------------
  * @exports addMenuDetail
  *****************************************************************/

export function addMenuDetail(values) {
  return dispatch => {
    dispatch(beginAddMenuDetail());
    return api.doAddNavigationLinks(values).then(response => {
      if (!response.status === 201) {
        dispatch(addMenuDetailFailure(response));
        dispatch(notificationSend(notif.MSG_ADD_LINK_ERROR));
      }
      dispatch(addMenuDetailSuccess(response));
      dispatch(notificationSend(notif.MSG_ADD_LINK_SUCCESS));
    });
  };
}

function beginAddMenuDetail() {
  return {
    type: t.ADD_MENU_DETAIL_REQUEST,
  };
}

function addMenuDetailSuccess(response) {
  return {
    type: t.ADD_MENU_DETAIL_SUCCESS,
    payload: response.body,
  };
}

function addMenuDetailFailure(err) {
  return {
    type: t.ADD_MENU_DETAIL_FAILURE,
    error: err,
  };
}
