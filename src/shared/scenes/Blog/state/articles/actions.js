/* @flow */
import { normalize } from 'normalizr';

import {
  sendNotification,
} from '../../../../state/modules/notifications/notifications';
import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../../../types/redux';
import * as t from '../actionTypes';
import { article as articleSchema, arrayOfArticle } from './schema';

export function togglePostLayoutView() {
  return { type: t.TOGGLE_POST_LAYOUT };
}

/**
  * FETCH POST ACTIONS
  * -------------------------
  * @exports fetchArticles
  * @exports fetchArticlesIfNeeded
  *****************************************************************/
/**
 * @function fetchArticlesIfNeeded
 * @description Function that determines whether or not posts need to be
 * fetched from the api. Dispatches either the fetchArticles Function
 * or returns the resolved promise if the posts are up to date.
 * @return {Promise} Posts Promise that resolves when posts are fetched
 * or they arent required to be refreshed.
 */
/* istanbul ignore next */
export const fetchArticlesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldfetchArticles(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchArticles(axios));
  }

  /* istanbul ignore next */
  return null;
};

/**
 * Function to retrieve posts from the api.
 * @return {Array} Posts returned as an array of post objects.
 */
export const fetchArticles = (axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({ type: t.FETCH_ARTICLES_REQUEST });

  return axios
    .get(`${API_PREFIX}/articles?include=[author,tags,media]`)
    .then(res => {
      const articles = res.data.results;
      const normalizedArticles = normalize(articles, arrayOfArticle);

      return dispatch({
        type: t.FETCH_ARTICLES_SUCCESS,
        payload: normalizedArticles,
      });
    })
    .catch(err => {
      return dispatch({
        type: t.FETCH_ARTICLES_FAILURE,
        error: err,
      });
    });
};
/**
 * Called by fetchArticlesIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
function shouldfetchArticles(state: Reducer) {
  const articles = state.blog.articles.ids;
  if (!articles.length) {
    return true;
  }
  return false;
}

/**
  * FETCH POST FROM SLUG ACTIONS
  * -------------------------
  * @exports fetchArticle
  * @exports fetchArticleIfNeeded
  *****************************************************************/
export const fetchArticle = (slug: string, axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: t.FETCH_ARTICLE_REQUEST,
    slug,
  });
  return axios
    .get(`${API_PREFIX}/articles/slug/${slug}?include=[author,tags,media]`)
    .then(res => {
      const singlePost = res.data;
      const normalizedPost = normalize(singlePost, articleSchema);
      return dispatch({
        type: t.FETCH_ARTICLE_SUCCESS,
        payload: normalizedPost,
        slug,
      });
    })
    .catch(err => {
      return dispatch({
        type: t.FETCH_ARTICLE_FAILURE,
        error: err,
      });
    });
};

/**
 * @function fetchArticleIfNeeded
 * @description Function that determines whether or not posts need to be
 * fetched from the api. Dispatches either the fetchArticles Function
 * or returns the resolved promise if the posts are up to date.
 * @return {Promise} Posts Promise that resolves when posts are fetched
 * or they arent required to be refreshed.
 */
/* istanbul ignore next */
export const fetchArticleIfNeeded = (slug: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldfetchArticle(getState(), slug)) {
    /* istanbul ignore next */
    return dispatch(fetchArticle(slug, axios));
  }

  /* istanbul ignore next */
  return null;
};

/**
 * Called by fetchArticleIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
/* istanbul ignore next */
const shouldfetchArticle = (state: Reducer, slug: string): boolean => {
  // In development, we want to allow dispatching actions from here
  // or the hot reloading of reducers wont update the component state
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const singlePost = state.blog.articles.all[slug];

  if (singlePost && state.blog.articles.isFetching) {
    return false;
  }

  return true;
};

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
        const normalizedData = normalize(res.data, articleSchema);
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
