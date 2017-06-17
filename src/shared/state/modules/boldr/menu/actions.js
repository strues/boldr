import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../notifications/notifications';
import * as t from '../actionTypes';

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
        return dispatch(sendNotification(notif.MSG_UPDATE_LINK_SUCCESS));
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
    mobileHref: values.mobileHref,
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
        return dispatch(sendNotification(notif.MSG_ADD_LINK_ERROR));
      }
      dispatch(addMenuDetailSuccess(res));
      return dispatch(sendNotification(notif.MSG_ADD_LINK_SUCCESS));
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
