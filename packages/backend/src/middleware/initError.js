import PrettyError from 'pretty-error';

const pretty = new PrettyError();

// this will skip events.js and http.js and similar core node files
pretty.skipNodeFiles();

// this will skip all the trace lines about express` core and sub-modules
pretty.skipPackage('express');

export default function initError(server) {
  // and use it for our app's error handler:
  server.use((error, request, response, next) => {
    // eslint-disable-line max-params
    console.log(pretty.render(error));
    next();
  });
}
