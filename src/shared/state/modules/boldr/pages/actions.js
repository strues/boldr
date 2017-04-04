import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { push } from 'react-router-redux';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';
import { page as pageSchema, arrayOfPage } from './schema';

/**
  * FETCH PAGES
  * -------------------------
  * @exports fetchPagesIfNeeded
  * @exports fetchPages
  *****************************************************************/
export function fetchPagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPages(getState())) {
      return dispatch(fetchPages());
    }

    return Promise.resolve();
  };
}

export function fetchPages() {
  return dispatch => {
    dispatch(requestPages());
    return api
      .getAllPages()
      .then(response => {
        const camelizedJson = camelizeKeys(response.body);
        const normalizedData = normalize(camelizedJson, arrayOfPage);
        return dispatch(receivePages(normalizedData));
      })
      .catch(err => {
        dispatch(receivePagesFailed(err));
      });
  };
}

function shouldFetchPages(state) {
  const pages = state.boldr.pages.all;
  if (!pages.length) {
    return true;
  }
  if (pages.length) {
    return false;
  }
}

const requestPages = () => {
  return { type: t.FETCH_PAGES_REQUEST };
};
const receivePages = normalizedData => ({
  type: t.FETCH_PAGES_SUCCESS,
  payload: normalizedData,
});
const receivePagesFailed = err => ({
  type: t.FETCH_PAGES_FAILURE,
  error: err,
});

/**
  * FETCH PAGE
  * -------------------------
  * @exports fetchPageByUrl
  *****************************************************************/
export function fetchPageByUrl(resource) {
  return dispatch => {
    dispatch(requestPage());
    if (resource === undefined) {
      resource = 'home';
    }
    return api
      .getPageByUrl(resource)
      .then(response => {
        dispatch(receivePage(response));
      })
      .catch(err => {
        dispatch(receivePageFailed(err));
      });
  };
}

const requestPage = () => {
  return { type: t.FETCH_PAGE_REQUEST };
};

const receivePage = response => ({
  type: t.FETCH_PAGE_SUCCESS,
  payload: response.body,
});

const receivePageFailed = err => ({
  type: t.FETCH_PAGE_FAILURE,
  error: err,
});
