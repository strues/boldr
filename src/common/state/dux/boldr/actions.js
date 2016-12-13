/**
 * Actions and async actions for the Boldr reducer and its ducklings.
 * src/state/dux/boldr/actions
 */
import { normalize, arrayOf } from 'normalizr';
import { camelizeKeys } from 'humps';
import { push } from 'react-router-redux';
import * as api from 'core/api';
import * as notif from 'core/constants';
import { notificationSend } from 'state/dux/notifications';
import {
  navigation as navigationSchema,
  setting as settingSchema,
  page as pageSchema,
} from 'core/services/schemas';
import * as t from './constants';

/**
  * LOAD MAIN NAV ACTIONS
  * -------------------------
  * @exports loadMainNav
  *****************************************************************/

export function loadMainNav() {
  return dispatch => {
    dispatch(startLoadNav());
    return api.getAllNavs()
      .then(response => {
        const camelizeThis = response.body;
        const camelizedJson = camelizeKeys(camelizeThis);
        const normalized = normalize(camelizedJson, arrayOf(navigationSchema));
        return dispatch(successLoadNav(normalized));
      })
      .catch(error => {
        dispatch(errorLoadNav(error));
      });
  };
}
export function loadMainNavIfNeeded() {
  return (dispatch, getState) => {
    if (shouldLoadMainNav(getState())) {
      return dispatch(loadMainNav());
    }

    return Promise.resolve();
  };
}

function shouldLoadMainNav(state) {
  const nav = state.boldr.nav.labels;
  if (!nav.length) {
    return true;
  }
  if (nav.length) {
    return false;
  }
  return nav;
}

function startLoadNav() {
  return {
    type: t.LOAD_NAVIGATION_REQUEST,
  };
}
function errorLoadNav(error) {
  return {
    type: t.LOAD_NAVIGATION_FAILURE,
    error,
  };
}

function successLoadNav(normalized) {
  return {
    type: t.LOAD_NAVIGATION_SUCCESS,
    payload: normalized,
  };
}

/**
  * UPDATE NAV LINK ACTIONS
  * -------------------------
  * @exports updateNavLinks
  *****************************************************************/

export function updateNavLinks(data) {
  return dispatch => {
    dispatch(beginUpdateNav());
    return api.doUpdateNavigationLinks(data)
      .then(response => {
        dispatch(doneUpdateNav(response));
        dispatch(notificationSend(notif.MSG_UPDATE_LINK_SUCCESS));
      })
      .catch(
        err => {
          dispatch(failUpdateNav(err.message));
          dispatch(notificationSend(notif.MSG_UPDATE_LINK_ERROR));
        });
  };
}

function beginUpdateNav() {
  return {
    type: t.UPDATE_NAVIGATION_REQUEST,
  };
}

function doneUpdateNav(response) {
  return {
    type: t.UPDATE_NAVIGATION_SUCCESS,
    payload: response,
  };
}

function failUpdateNav(err) {
  return {
    type: t.UPDATE_NAVIGATION_FAILURE,
    error: err,
  };
}
const beginAddNavLink = () => {
  return { type: t.ADD_NAVIGATION_LINK_REQUEST };
};

const doneAddNavLink = (response) => {
  return {
    type: t.ADD_NAVIGATION_LINK_SUCCESS,
    payload: response.body,
  };
};

const failAddNavLink = (err) => {
  return {
    type: t.ADD_NAVIGATION_LINK_FAILURE,
    error: err,
  };
};

export function addNavLinks(data) {
  return dispatch => {
    dispatch(beginAddNavLink());
    return api.doAddNavigationLinks(data)
      .then(response => {
        if (!response.status === 201) {
          dispatch(failAddNavLink('Error'));
          dispatch(notificationSend(notif.MSG_ADD_LINK_ERROR));
        }
        dispatch(doneAddNavLink(response));
        dispatch(notificationSend(notif.MSG_ADD_LINK_SUCCESS));
      });
  };
}
/**
  * GET SETTINGS ACTIONS
  * -------------------------
  * @exports fetchSettingsIfNeeded
  *****************************************************************/

/**
 * @function fetchSettingsIfNeeded
 * @description Function that determines whether or not menus need to be
 * fetched from the api. Dispatches either the loadMenus Function
 * or returns the resolved promise if the menus are up to date.
 * @return {Promise} Menus Promise that resolves when menus are fetched
 * or they arent required to be refreshed.
 */
export function fetchSettingsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSettings(getState())) {
      return dispatch(loadBoldrSettings());
    }

    return Promise.resolve();
  };
}

export function loadBoldrSettings() {
  return dispatch => {
    dispatch(loadSettings());
    return api.getAllSettings()
      .then(response => {
        const camelizedJson = camelizeKeys(response.body);
        const normalized = normalize(camelizedJson, arrayOf(settingSchema));
        return dispatch(doneLoadSettings(normalized));
      })
      .catch(error => {
        dispatch(failLoadSettings(error));
      });
  };
}

/**
 * @function shouldFetchSettings
 * Called by fetchSettingsIfNeeded
 * @param  {Object} state   The boldr state which contains the settings
 */
function shouldFetchSettings(state) {
  const settings = state.boldr.settings.keys;
  if (!settings.length) {
    return true;
  }
  if (settings.length) {
    return false;
  }
  return settings;
}

const loadSettings = () => ({
  type: t.LOAD_SETTINGS_REQUEST,
});

function doneLoadSettings(normalized) {
  return {
    type: t.LOAD_SETTINGS_SUCCESS,
    payload: normalized,
  };
}

const failLoadSettings = (error) => ({
  type: t.LOAD_SETTINGS_FAILURE,
  error,
});

/**
  * UPDATE SETTINGS ACTIONS
  * -------------------------
  * @exports updateBoldrSettings
  *****************************************************************/

export function updateBoldrSettings(payload) {
  return dispatch => {
    dispatch(beginUpdateSettings());
    return api.doUpdateSettings(payload)
      .then(response => {
        dispatch(doneUpdateSettings(response));
        dispatch(loadSettings());
        dispatch(notificationSend({
          message: 'Updated your settings.',
          kind: 'info',
          dismissAfter: 3000,
        }));
        dispatch(push('/dashboard'));
      })
      .catch(err => {
        dispatch(failUpdateSettings(err));
        dispatch(notificationSend({
          message: `We ran into a problem with your set up ${err}`,
          kind: 'error',
          dismissAfter: 3000,
        }));
      });
  };
}
const beginUpdateSettings = () => ({
  type: t.UPDATE_SETTINGS_REQUEST,
});

const doneUpdateSettings = (response) => ({
  type: t.UPDATE_SETTINGS_SUCCESS,
  payload: response.body,
});

const failUpdateSettings = (err) => ({
  type: t.UPDATE_SETTINGS_FAILURE,
  error: err,
});


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
        const normalized = normalize(camelizedJson, arrayOf(pageSchema));
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
  return { type: t.LOAD_PAGES_REQUEST };
};
const receivePages = (normalized) => ({
  type: t.LOAD_PAGES_SUCCESS,
  payload: normalized,
});
const receivePagesFailed = (err) => ({
  type: t.LOAD_PAGES_FAILURE, error: err,
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
  return { type: t.LOAD_PAGE_REQUEST };
};

const receivePage = (response) => ({
  type: t.LOAD_PAGE_SUCCESS,
  payload: response.body,
});

const receivePageFailed = (err) => ({
  type: t.LOAD_PAGE_FAILURE, error: err,
});
