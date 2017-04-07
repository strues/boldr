import { normalize, arrayOf, schema } from 'normalizr';
import { push } from 'react-router-redux';
import Axios from 'axios';
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
    return Axios.get('/api/v1/pages')
      .then(response => {
        const normalizedData = normalize(response.body, arrayOfPage);
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
    return Axios.get(`/api/v1/pages/${resource}`)
      .then(res => {
        dispatch(receivePage(res));
      })
      .catch(err => {
        dispatch(receivePageFailed(err));
      });
  };
}

const requestPage = () => {
  return { type: t.FETCH_PAGE_REQUEST };
};

const receivePage = res => ({
  type: t.FETCH_PAGE_SUCCESS,
  payload: res.data,
});

const receivePageFailed = err => ({
  type: t.FETCH_PAGE_FAILURE,
  error: err,
});
