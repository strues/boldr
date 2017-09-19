export default function initErrorHandler(server) {
  // technically we should never see this during production
  // React takes over
  // eslint-disable-next-line no-unused-vars
  server.use((req, res, next) => {
    // eslint-disable-line no-unused-vars,max-len
    res.status(404).send('Sorry, the requested resource is nowhere to be found.');
  });
  // eslint-disable-next-line no-unused-vars
  server.use((error, req, res, next) => {
    error.stack = error.stack || '';
    const errorDetails = {
      message: error.message,
      status: error.status,
      stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    };
    res.status(error.status || 500);
    res.format({
      // Based on the `Accept` http header
      'text/html': () => {
        res.render('error', errorDetails);
      },
      'application/json': () => res.json(errorDetails),
    });
  });
}
