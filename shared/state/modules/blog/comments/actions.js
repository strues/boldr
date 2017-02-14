/* @flow */
import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import merge from 'lodash/merge';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';

/**
  * NEW COMMENT ACTIONS
  * -------------------------
  * @exports newComment
  *****************************************************************/

export function newComment(data, postId) {
  return (dispatch: Function) => {
    dispatch(beginNewComment());
    return api.doNewPostComment(data, postId)
      .then(response => {
        if (response.status !== 201) {
          dispatch(errorAddingComment(response));
        }
        dispatch(newCommentSuccess(response));
        dispatch(notificationSend(notif.MSG_NEW_COMMENT_SUCCESS));
      })
      .catch(err => {
        dispatch(errorAddingComment(err));
        dispatch(notificationSend(notif.MSG_NEW_COMMENT_FAILURE));
      });
  };
}

const beginNewComment = () => {
  return { type: t.CREATE_COMMENT_REQUEST };
};

const newCommentSuccess = (response: Object) => {
  return {
    type: t.CREATE_COMMENT_SUCCESS,
    payload: response.body,
  };
};

const errorAddingComment = (err) => {
  return {
    type: t.CREATE_COMMENT_FAILURE,
    error: err,
  };
};
