/* @flow */
import { sendNotification } from '../../../../state/notifications/notifications';
import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';
import * as t from '../actionTypes';

export function togglePostLayoutView() {
  return { type: t.TOGGLE_POST_LAYOUT };
}

export function selectArticle(post: Object) {
  return {
    type: t.SELECT_ARTICLE,
    post,
  };
}

/**
  * CREATE ARTICLE ACTIONS
  * -------------------------
  * @exports createArticle
  *****************************************************************/

/**
 * Create a new post takes the submitted form-data as data and
 * sends the information to the api.
 * @param  {Object} data        The data from the form / post editor
 * @return {Object}             Response object.
 */
export function createArticle(data: Article) {
  return (dispatch: Function) => {
    dispatch({ type: t.CREATE_ARTICLE_REQUEST });
    return api
      .post(`${API_PREFIX}/articles`, data)
      .then(res => {
        const normalizedData = res.data;
        dispatch(createArticleSuccess(normalizedData));
        return dispatch(sendNotification(notif.MSG_CREATE_ARTICLE_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
        return dispatch(sendNotification(notif.MSG_CREATE_ARTICLE_FAILUREURE));
      });
  };
}

const createArticleSuccess = (normalizedData: Object) => {
  return {
    type: t.CREATE_ARTICLE_SUCCESS,
    payload: normalizedData,
  };
};

const errorCreatingPost = err => {
  return {
    type: t.CREATE_ARTICLE_FAILURE,
    error: err,
  };
};

/**
  * DELETE POST ACTIONS
  * -------------------------
  * @exports deletePost
  *****************************************************************/

export function deletePost(id: string) {
  return (dispatch: Function) => {
    dispatch({
      type: t.DELETE_ARTICLE_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/articles/${id}`)
      .then(() => {
        return dispatch({
          type: t.DELETE_ARTICLE_SUCCESS,
          id,
        });
      })
      .catch(err => {
        return dispatch({
          type: t.DELETE_ARTICLE_FAILURE,
          error: err,
        });
      });
  };
}

/**
  * UPDATE ARTICLE ACTIONS
  * -------------------------
  * @exports updateArticle
  *****************************************************************/

export function updateArticle(postData: Article) {
  return (dispatch: Function) => {
    dispatch({ type: t.UPDATE_ARTICLE_REQUEST });
    return api
      .put(`${API_PREFIX}/articles/${postData.id}`, postData)
      .then(res => {
        dispatch(
          sendNotification({
            message: 'Updated article.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
        return dispatch({
          type: t.UPDATE_ARTICLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch(
          sendNotification({
            message: 'There was a problem updating the article.',
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
        return dispatch({
          type: t.UPDATE_ARTICLE_FAILURE,
          error: err,
        });
      });
  };
}
