import api, { API_PREFIX } from '../../../core/api';
import { sendNotification } from '../../notifications/notifications';
import * as t from '../actionTypes';

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
    return api
      .put(`${API_PREFIX}/settings/${settingId}`, data)
      .then(res => {
        dispatch(doneUpdateSettings(res.data));
        return dispatch(
          sendNotification({
            message: 'Updated your settings.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch(failUpdateSettings(err));
        dispatch(
          sendNotification({
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
