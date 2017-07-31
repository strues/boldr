import HttpError from './httpError';

/**
 * @class InternalServer
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class InternalServer extends HttpError {
  constructor(message, status = 500, isPublic = true) {
    super(
      `The server encountered an unexpected condition which prevented it
    from fulfilling the request.`,
      status,
      isPublic,
    );
  }
}

/**
 * @class NotImplemented
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class NotImplemented extends HttpError {
  constructor(message, status = 500, isPublic = false) {
    super(
      'The server does not support the functionality required to fulfill the request.',
      status,
      isPublic,
    );
  }
}

export { InternalServer, NotImplemented };
