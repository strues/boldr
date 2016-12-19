import responseHandler from 'core/response';

import Activity from './activity.model';

const debug = require('debug')('boldrAPI:activity-controller');

export async function listActivities(req, res, next) {
  const activities = await Activity.query().orderBy('created_at', 'desc').eager('owner');
  return responseHandler(res, 200, activities);
}
