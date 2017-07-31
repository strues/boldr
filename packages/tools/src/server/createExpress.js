import { resolve as resolvePath } from 'path';
import express from 'express';
import uuid from 'uuid';
import PrettyError from 'pretty-error';
import appRoot from '@boldr/utils/lib/node/appRoot';

const pretty = new PrettyError();

// this will skip events.js and http.js and similar core node files
pretty.skipNodeFiles();

// this will skip all the trace lines about express` core and sub-modules
pretty.skipPackage('express');

export default function createExpress({ customMiddleware = null }) {
  // Create our express based server.
  const server = express();

  // Attach a unique "nonce" to every response. This allows use to declare
  // inline scripts as being safe for execution against our content security policy.
  // @see https://helmetjs.github.io/docs/csp/
  server.use((request, response, next) => {
    response.locals.nonce = uuid(); // eslint-disable-line no-param-reassign
    next();
  });

  // and use it for our app's error handler:
  server.use((error, request, response, next) => {
    // eslint-disable-line max-params
    console.log(pretty.render(error));
    next();
  });

  // Don't expose any software information to hackers.
  server.disable('x-powered-by');

  if (customMiddleware) {
    customMiddleware.forEach(middleware => {
      if (middleware instanceof Array) {
        server.use(...middleware);
      } else {
        server.use(middleware);
      }
    });
  }

  // Configure static serving of our webpack bundled client files.
  const ABSOLUTE_CLIENT_OUTPUT_PATH = resolvePath(appRoot.get(), process.env.CLIENT_OUTPUT);
  server.use(process.env.PUBLIC_PATH, express.static(ABSOLUTE_CLIENT_OUTPUT_PATH));

  return server;
}
