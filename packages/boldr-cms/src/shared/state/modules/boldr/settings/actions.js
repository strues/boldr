import { normalize, arrayOf } from 'normalizr';
import { push } from 'react-router-redux';
import { camelizeKeys } from 'humps';
import * as api from 'core/api';
import { setting as settingSchema } from 'core/schemas';
import * as notif from 'core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from './constants';

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
  type: t.FETCH_SETTINGS_REQUEST,
});

function doneLoadSettings(normalized) {
  return {
    type: t.FETCH_SETTINGS_SUCCESS,
    payload: normalized,
  };
}

const failLoadSettings = (error) => ({
  type: t.FETCH_SETTINGS_FAILURE,
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
        dispatch(push('/admin'));
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
