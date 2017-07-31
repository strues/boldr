import HttpError from './httpError';

/**
 * @class BadRequest
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class BadRequest extends HttpError {
  constructor(
    message = 'The request could not be understood by the server due to malformed syntax.',
    status = 400,
    isPublic = false,
  ) {
    super(message, status, isPublic);
  }
}

/**
 * @class Unauthorized
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Unauthorized extends HttpError {
  constructor(
    message = 'The request requires user authentication. Please try again with the correct authorization header',
    status = 401,
    isPublic = true,
  ) {
    super(message, status, isPublic);
  }
}

/**
 * @class Forbidden
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Forbidden extends HttpError {
  constructor(message = 'Insufficient access rights.', status = 403, isPublic = true) {
    super(message, status, isPublic);
  }
}

/**
 * @class NotFound
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class NotFound extends HttpError {
  constructor(message, status = 404, isPublic = true) {
    super(
      'Unable to find what you were looking for. Please try the request again.',
      status,
      isPublic,
    );
  }
}

/**
 * @class MethodNotAllowed
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class MethodNotAllowed extends HttpError {
  constructor(message, status = 405, isPublic = false) {
    super(
      `The method received in the request-line is known by the origin server but
    not supported by the target resource.`,
      status,
      isPublic,
    );
  }
}

/**
 * @class Conflict
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Conflict extends HttpError {
  constructor(message, status = 409, isPublic = true) {
    super(
      `The request could not be completed due to a conflict with the current state
    of the target resource.`,
      status,
      isPublic,
    );
  }
}
/**
 * @class UserNotVerifiedError
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class UserNotVerifiedError extends HttpError {
  constructor(message, status = 401, isPublic = true) {
    super(
      'This account has not been confirmed. Please check your email for a verification link.',
      status,
      isPublic,
    );
  }
}

export {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  UserNotVerifiedError,
};
