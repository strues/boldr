import { InternalServer } from '../core/errors';
/**
* Create an Error Object
* @param {Array} or {object} errors - an instance or array of instances of APIError
* return {object} format - properly-formatted JSONAPI errors object
*/
function formatError(errors) {
  let errorFormat;

  if (Array.isArray(errors)) {
    const formattedErrors = errors.map(error => {
      const formattedError = {
        status: error.status,
        title: error.title,
        detail: error.message,
      };
      return formattedError;
    });
    // wrap the array in an object
    errorFormat = { errors: formattedErrors };
  } else {
    const error = errors;
    const formattedError = {
      status: error.status,
      title: error.title,
      detail: error.message,
    };
    // wrap the object in an array and then an object
    errorFormat = { errors: [formattedError] };
  }
  return errorFormat;
}

function errorHandler(error, req, res, next) {
  let err = error;

  /* if we get an unhandled error, we want to log to console and turn it into an API error */
  if ((!(error instanceof InternalServer) && !(error[0] instanceof InternalServer))) {
    console.error(err);
    err = new InternalServer(error.message || 'An unknown server error occurred');
  }
  const processedErrors = formatError(err);

  res.status(processedErrors.errors[0].status || 500).json(processedErrors);
  return next();
}

export default errorHandler;
