import { BaseController, BaseModel } from './base';
import { generateHash, randomString, SALT } from './hashing';
import logger from './logger';
import responseHandler from './response';

import { checkRole, checkPermissions } from './middleware/rbac';

import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  InternalServer,
  NotImplemented,
  UserNotVerifiedError,
}
from './errors';

export {
  logger,
  responseHandler,
  BaseController,
  BaseModel,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  InternalServer,
  NotImplemented,
  UserNotVerifiedError,
  generateHash,
  randomString,
  SALT,
  checkRole,
  checkPermissions,
};
