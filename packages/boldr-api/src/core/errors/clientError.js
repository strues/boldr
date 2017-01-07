import HttpError from './httpError';

/**
 * @class BadRequest
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class BadRequest extends HttpError {
  constructor(message) {
    super(message || 'The request could not be understood by the server due to malformed syntax.', 'BadRequest', 400);
  }
}

/**
 * @class Unauthorized
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Unauthorized extends HttpError {
  constructor(message) {
    super(message || `The request requires user authentication. Please try again with the
    correct authorization header`, 'Unauthorized', 401);
  }
}

/**
 * @class Forbidden
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Forbidden extends HttpError {
  constructor() {
    super('Insufficient access rights.', 'Forbidden', 403);
  }
}

/**
 * @class NotFound
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class NotFound extends HttpError {
  constructor() {
    super(`The server monkeys misplaced the resource you requested. Check for misspellings and
    try the request again..`, 'NotFound', 404);
  }
}

/**
 * @class MethodNotAllowed
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class MethodNotAllowed extends HttpError {
  constructor() {
    super(`The method received in the request-line is known by the origin server but
    not supported by the target resource.`, 'MethodNotAllowed', 405);
  }
}

/**
 * @class Conflict
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class Conflict extends HttpError {
  constructor() {
    super(`The request could not be completed due to a conflict with the current state
    of the target resource.`, 'Conflict', 409);
  }
}
/**
 * @class UserNotVerifiedError
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class UserNotVerifiedError extends HttpError {
  constructor() {
    super('This account has not been confirmed. Please check your email for a verification link.',
      'UserNotVerifiedError', 401);
  }
}

export { BadRequest, Unauthorized, Forbidden, NotFound, MethodNotAllowed, Conflict, UserNotVerifiedError };
