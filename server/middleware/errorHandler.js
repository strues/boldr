import httpStatus from 'http-status';

import ApiError from '../core/errors/ApiError';

export default (app) => {
    // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new ApiError('Not found', httpStatus.NOT_FOUND);

    return next(err);
  });

    // error handler - no stacktraces leaked to user unless development
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const statusCode = err.status || 500;

    const stacktrace = app.get('env') === 'development' ? {
      stack: err.stack,
    } : {};

    res.status(statusCode);
    res.json({
      status: statusCode,
      error: err.error || err.message,
      ...stacktrace,
    });
  });
};
