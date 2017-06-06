import clientError from './clientError';
import HttpError from './httpError';
import serverError from './serverError';

const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  UserNotVerifiedError,
} = clientError;

const { InternalServer, NotImplemented } = serverError;

export {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  InternalServer,
  NotImplemented,
  UserNotVerifiedError,
  HttpError,
};
