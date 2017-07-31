class ExtendableError {
  constructor(message = null) {
    this.message = message;
    this.stack = new Error().stack;
  }
}

/**
 * @class HttpError
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
class HttpError extends ExtendableError {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

export default HttpError;
