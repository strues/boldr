/**
 * @class HttpError
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
class HttpError extends Error {
  constructor(message, type, status) {
    super(message);

    this.name = this.constructor.name;
    this.type = type;
    this.status = status;
    // this.stack = this.constructor.stack;
    // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true;

    // Still no message present?
    if (!this.message) {
      this.message = 'Unknown error';
    }
  }

  getHttpStatus() {
    return this.status;
  }
}

export default HttpError;
