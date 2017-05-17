const clientError = require('./clientError');
const HttpError = require('./httpError');
const serverError = require('./serverError');

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

module.exports = {
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
