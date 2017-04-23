import api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../notifications/notifications';
import * as t from '../actionTypes';

const API_PREFIX = '/api/v1';
/**
  * FETCH MENUS ACTIONS
  * -------------------------
  * @exports fetchMainMenuIfNeeded
  * @exports fetchMainMenu
  *****************************************************************/

/* istanbul ignore next */
export const fetchMainMenuIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldfetchMainMenu(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchMainMenu(axios));
  }

  /* istanbul ignore next */
  return null;
};

export const fetchMainMenu = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({ type: t.GET_MAIN_MENU_REQUEST });

  return api
    .get(`${API_PREFIX}/menus/1`)
    .then(res => {
      dispatch({
        type: t.GET_MAIN_MENU_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: t.GET_MAIN_MENU_FAILURE,
        error: err,
      });
    });
};
function shouldfetchMainMenu(state) {
  const menu = state.boldr.menus.main.details;
  if (!menu.length) {
    return true;
  }
  if (menu.length) {
    return false;
  }
  return menu;
}

/**
  * UPDATE MENU DETAIL ACTIONS
  * -------------------------
  * @exports updateMenuDetails
  *****************************************************************/

export function updateMenuDetails(data) {
  return dispatch => {
    dispatch({
      type: t.UPDATE_MENU_REQUEST,
    });
    return api
      .put(`${API_PREFIX}/menu-details/${data.id}`, data)
      .then(res => {
        dispatch(updateMenuDetailsSuccess(res));
        dispatch(sendNotification(notif.MSG_UPDATE_LINK_SUCCESS));
      })
      .catch(err => {
        dispatch(updateMenuDetailsFailure(err.message));
        dispatch(sendNotification(notif.MSG_UPDATE_LINK_ERROR));
      });
  };
}

function updateMenuDetailsSuccess(res) {
  return {
    type: t.UPDATE_MENU_SUCCESS,
    payload: res.data,
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
  const data = {
    name: values.name,
    href: values.href,
    mobile_href: values.mobileHref,
    hasDropdown: values.has_dropdown,
    cssClassname: values.cssClassname,
    icon: values.icon,
    menuId: 1,
    order: values.order,
    children: {
      key: values.key,
      items: values.items,
    },
  };
  return dispatch => {
    dispatch({
      type: t.ADD_MENU_DETAIL_REQUEST,
    });
    return api.post(`${API_PREFIX}/menu-details`, data).then(res => {
      if (!res.status === 201) {
        dispatch(addMenuDetailFailure(res));
        dispatch(sendNotification(notif.MSG_ADD_LINK_ERROR));
      }
      dispatch(addMenuDetailSuccess(res));
      dispatch(sendNotification(notif.MSG_ADD_LINK_SUCCESS));
    });
  };
}

function addMenuDetailSuccess(res) {
  return {
    type: t.ADD_MENU_DETAIL_SUCCESS,
    payload: res.data,
  };
}

function addMenuDetailFailure(err) {
  return {
    type: t.ADD_MENU_DETAIL_FAILURE,
    error: err,
  };
}
