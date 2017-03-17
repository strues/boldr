/* @flow */
import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import merge from 'lodash/merge';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';
import { comment as commentSchema } from './schema';

/**
  * NEW COMMENT ACTIONS
  * -------------------------
  * @exports newComment
  *****************************************************************/

export function newComment(data: Object, postId: string) {
  return (dispatch: Function) => {
    dispatch(beginNewComment());
    return api.doNewPostComment(data, postId)
      .then(response => {
        if (response.status !== 201) {
          dispatch(errorAddingComment(response));
        }
        const camelizedJson = camelizeKeys(response.body);
        // const normalized = normalize(camelizedJson, arrayOf(postSchema, { idAttribute: 'slug' }));
        const normalizedData = normalize(response.body, commentSchema);
        dispatch(newCommentSuccess(normalizedData));
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

const newCommentSuccess = (normalizedData: Object) => {
  return {
    type: t.CREATE_COMMENT_SUCCESS,
    payload: normalizedData,
  };
};

const errorAddingComment = (err) => {
  return {
    type: t.CREATE_COMMENT_FAILURE,
    error: err,
  };
};
