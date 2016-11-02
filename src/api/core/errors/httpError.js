/**
 * @class HttpError
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
class HttpError extends Error {
  constructor(message, name = 'Error', httpStatus = 400) {
    super();
    this.message = message;
    this.name = name;
    this.httpStatus = httpStatus;
    // This is required since bluebird 4 doesn't append it anymore.
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
  
  getHttpStatus() {
    return this.httpStatus;
  }
}

export default HttpError;
