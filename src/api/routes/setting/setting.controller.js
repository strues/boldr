import { responseHandler, InternalServer } from '../../core';
import Setting from './setting.model';

const debug = require('debug')('boldr:settings-controller');

export async function listSettings(req, res, next) {
  const settings = await Setting.query();

  if (!settings) {
    next(new InternalServer());
  }

  return responseHandler(res, 200, settings);
}

export async function getSetting(req, res) {
  const setting = await Setting
    .query()
    .findById(req.params.id);
  if (!setting) return res.status(404).json({ error: 'Unable to find a setting matching the id' });
  return responseHandler(res, 200, setting);
}

export async function addSetting(req, res) {
  const settingPayload = {
    key: req.body.key,
    value: req.body.value,
    description: req.body.description,
  };

  const setting = await Setting.query().insert(settingPayload);

  return responseHandler(res, 201, setting);
}

export function updateSetting(req, res) {
  debug(req.body);
  return Setting.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(setting => responseHandler(res, 202, setting));
}
