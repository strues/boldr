import { responseHandler, InternalServer } from '../../core';

import Activity from './activity.model';

const debug = require('debug')('boldr:activity-controller');

export async function listActivities(req, res, next) {
  try {
    const activities = await Activity.query().orderBy('created_at', 'desc').eager('owner');
    return responseHandler(null, res, 200, activities);
  } catch (error) {
    return next(new InternalServer());
  }
}
