import { BaseController, BaseModel } from './base';
import { generateHash, randomString, SALT } from './hashing';
import logger from './logger';
import responseHandler from './response';
import {
  isAuthenticated,
  signToken,
}
from './authentication';
import { checkRole, checkScope, checkPermissions } from './middleware/middleware';

import {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  InternalServer,
  NotImplemented,
  AccountNotVerifiedError,
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
  AccountNotVerifiedError,
  generateHash,
  randomString,
  SALT,
  isAuthenticated,
  signToken,
  checkRole,
  checkScope,
  checkPermissions,
};
