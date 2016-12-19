import HttpError from './httpError';

/**
 * @class InternalServer
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class InternalServer extends HttpError {
  constructor() {
    super(`The server encountered an unexpected condition which prevented it
    from fulfilling the request.`, 'InternalServer', 500);
  }
}

/**
 * @class NotImplemented
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
class NotImplemented extends HttpError {
  constructor() {
    super('The server does not support the functionality required to fulfill the request.', 'NotImplemented', 500);
  }
}

export { InternalServer };
export { NotImplemented };
