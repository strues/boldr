export default function initErrorHandler(app) {
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    error.stack = error.stack || '';
    const errorDetails = {
      message: error.message,
      status: error.status,
      stack: error.stack,
    };
    return res.status(error.status || 500).json(errorDetails);
  });
}
