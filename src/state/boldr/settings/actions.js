import { API_PREFIX } from '../../../core';
import { sendNotification } from '../../notifications/notifications';
import * as t from '../actionTypes';

/**
  * UPDATE SETTINGS ACTIONS
  * -------------------------
  * @exports updateBoldrSettings
  *****************************************************************/
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
