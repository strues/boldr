/* @flow */
import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../../../state/notifications/notifications';
import * as t from '../actionTypes';

/**
  * SELECT TAG ACTIONS
  * -------------------------
  * @exports selectTag
  * @exports clearTag
  *****************************************************************/

export function selectTag(tag: Tag) {
  return {
    type: t.SELECT_TAG,
    tag,
  };
}
export function clearTag(tag: Tag) {
  return {
    type: t.CLEAR_TAG,
  };
}

/**
  * CREATE TAG ACTIONS
  * -------------------------
  * @exports createTag
  *****************************************************************/

export function createTag(values) {
  const data = {
    name: values.name,
    description: values.description,
  };
  return dispatch => {
    dispatch(beginAddTag());
    return api.post(`${API_PREFIX}/tags`, data).then(res => {
      if (!res.status === 201) {
        dispatch(addTagFailure(res));
        return dispatch(sendNotification(notif.MSG_ADD_TAG_FAILURE));
      }
      dispatch(addTagSuccess(res));
      return dispatch(sendNotification(notif.MSG_ADD_TAG_SUCCESS));
    });
  };
}

function beginAddTag() {
  return {
    type: t.ADD_TAG_REQUEST,
  };
}

function addTagSuccess(res) {
  return {
    type: t.ADD_TAG_SUCCESS,
    payload: res.data,
  };
}

function addTagFailure(res) {
  return {
    type: t.ADD_TAG_FAILURE,
    error: res.err,
  };
}

/**
  * DELETE TAG ACTIONS
  * -------------------------
  * @exports deleteTag
  *****************************************************************/

export function deleteTag(id) {
  return dispatch => {
    dispatch({
      type: t.DELETE_TAG_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/tags/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_TAG_SUCCESS,
          id,
        });
        return dispatch(sendNotification(notif.MSG_DELETE_TAG_SUCCESS));
      })
      .catch(err => {
        dispatch(deleteTagFail(err));
        dispatch(sendNotification(notif.MSG_DELETE_TAG_FAILURE));
      });
  };
}

const deleteTagFail = err => ({
  type: t.DELETE_TAG_FAILURE,
  error: err.error.message,
});
