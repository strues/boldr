import { normalize, arrayOf } from 'normalizr';
import { push } from 'react-router-redux';
import Axios from 'axios';
import * as notif from '../../../../core/constants';
import { notificationSend } from '../../notifications/notifications';
import * as t from '../../actionTypes';
import { setting as settingSchema, arrayOfSetting } from './schema';

/**
  * FETCH SETTINGS ACTIONS
  * -------------------------
  * @exports fetchSettingsIfNeeded
  * @exports fetchSettings
  *****************************************************************/

/**
 * @function fetchSettingsIfNeeded
 * @description Function that determines whether or not menus need to be
 * fetched from the api. Dispatches either the loadMenus Function
 * or returns the resolved promise if the menus are up to date.
 * @return {Promise} Menus Promise that resolves when menus are fetched
 * or they arent required to be refreshed.
 */

/* istanbul ignore next */
export const fetchSettingsIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchSettings(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchSettings(axios));
    }

    /* istanbul ignore next */
    return null;
  };

export const fetchSettings = (axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: t.FETCH_SETTINGS_REQUEST });

    return Axios.get('/api/v1/settings')
      .then(res => {
        const settingsData = res.data;
        const normalizedSettings = normalize(settingsData, arrayOfSetting);

        dispatch({
          type: t.FETCH_SETTINGS_SUCCESS,
          payload: normalizedSettings,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_SETTINGS_FAILURE,
          error: err,
        });
      });
  };
/**
 * @function shouldFetchSettings
 * Called by fetchSettingsIfNeeded
 * @param  {Object} state   The boldr state which contains the settings
 */
function shouldFetchSettings(state) {
  const settings = state.boldr.settings.ids;
  if (!settings.length) {
    return true;
  }

  return false;
}

/**
  * UPDATE SETTINGS ACTIONS
  * -------------------------
  * @exports updateBoldrSettings
  *****************************************************************/

export function updateBoldrSettings(payload) {
  const settingId = payload.id;
  const data = {
    value: payload.value,
  };
  return dispatch => {
    dispatch(beginUpdateSettings());
    return Axios.put(`/api/v1/settings/${settingId}`)
      .then(res => {
        dispatch(doneUpdateSettings(res));
        dispatch(loadSettings());
        dispatch(
          notificationSend({
            message: 'Updated your settings.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
        dispatch(push('/admin'));
      })
      .catch(err => {
        dispatch(failUpdateSettings(err));
        dispatch(
          notificationSend({
            message: `We ran into a problem with your set up ${err}`,
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
      });
  };
}
const beginUpdateSettings = () => ({
  type: t.UPDATE_SETTINGS_REQUEST,
});

const doneUpdateSettings = res => ({
  type: t.UPDATE_SETTINGS_SUCCESS,
  payload: res.data,
});

const failUpdateSettings = err => ({
  type: t.UPDATE_SETTINGS_FAILURE,
  error: err,
});
