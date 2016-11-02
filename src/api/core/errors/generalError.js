/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(error, status) {
    super(error);
    this.name = this.constructor.name;
    this.error = error;
    this.status = status;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing a GeneralError
 *
 * @extends ExtendableError
 */
class GeneralError extends ExtendableError {
    /**
     * Creates an API error.
     *
     * @param {string} error - Error.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the error should be visible to user or not.
     */
  constructor(error, status = 500) {
    super(error, status);
  }
}

export default GeneralError;
