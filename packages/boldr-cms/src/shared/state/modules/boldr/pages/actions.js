import { normalize, arrayOf } from 'normalizr';
import { push } from 'react-router-redux';
import { camelizeKeys } from 'humps';
import * as api from '../../../../core/api';
import { page as pagesSchema } from '../../../../core/schemas';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from './constants';

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
    return api.getAllPages()
      .then(response => {
        const camelizedJson = camelizeKeys(response.body);
        const normalized = normalize(camelizedJson, arrayOf(pagesSchema));
        return dispatch(receivePages(normalized));
      })
      .catch(err => {
        dispatch(receivePagesFailed(err));
      });
  };
}

function shouldFetchPages(state) {
  const pages = state.boldr.pages.labels;
  if (!pages.length) {
    return true;
  }
  if (pages.length) {
    return false;
  }
  return pages;
}

const requestPages = () => {
  return { type: t.FETCH_PAGES_REQUEST };
};
const receivePages = (normalized) => ({
  type: t.FETCH_PAGES_SUCCESS,
  payload: normalized,
});
const receivePagesFailed = (err) => ({
  type: t.FETCH_PAGES_FAILURE, error: err,
});

/**
  * FETCH PAGE
  * -------------------------
  * @exports fetchPageByUrl
  *****************************************************************/
export function fetchPageByUrl(url) {
  return dispatch => {
    dispatch(requestPage());
    if (url === undefined) {
      url = 'home';
    }
    return api.getPageByUrl(url)
      .then(response => {
        if (response.status !== 200 || response.status !== 304) {
          dispatch(receivePageFailed());
        }
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

const receivePage = (response) => ({
  type: t.FETCH_PAGE_SUCCESS,
  payload: response.body,
});

const receivePageFailed = (err) => ({
  type: t.FETCH_PAGE_FAILURE, error: err,
});
