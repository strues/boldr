import responseHandler from '../../core/response';

import Activity from './activity.model';

const debug = require('debug')('boldrAPI:activity-controller');

export async function listActivities(req, res, next) {
  try {
    const activities = await Activity.query().orderBy('created_at', 'desc').limit(10).eager('owner');
    return responseHandler(res, 200, activities);
  } catch (error) {
    return res.status(500).json(error);
  }
}
