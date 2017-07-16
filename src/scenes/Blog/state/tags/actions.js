/* @flow */
import { API_PREFIX } from '../../../../core';
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

const deleteTagFail = err => ({
  type: t.DELETE_TAG_FAILURE,
  error: err.error.message,
});
