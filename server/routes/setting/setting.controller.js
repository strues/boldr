import { responseHandler } from '../../core';
import Setting from '../../models/setting';

const debug = require('debug')('boldrAPI:settings-controller');

export async function listSettings(req, res, next) {
  try {
    const settings = await Setting.query();

    if (!settings) {
      return res.status(404).json({ message: 'Unable to find any settings. Theres a problem.' });
    }

    return responseHandler(res, 200, settings);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getSetting(req, res) {
  try {
    const setting = await Setting
      .query()
      .findById(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Unable to find a setting matching the id' });
    return responseHandler(res, 200, setting);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addSetting(req, res) {
  try {
    const settingPayload = {
      key: req.body.key,
      value: req.body.value,
      description: req.body.description,
    };

    const setting = await Setting.query().insert(settingPayload);

    return responseHandler(res, 201, setting);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export function updateSetting(req, res) {
  debug(req.body);
  return Setting.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(setting => responseHandler(res, 202, setting));
}
