/* @flow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import type { Middleware, $Request, $Response, NextFunction } from 'express';

const errorHandlersMiddleware = [
  // Handle 404 errors.
  function notFoundMiddlware(req: $Request, res: $Response, next: NextFunction) {
    res.status(404).send('Sorry, that resource was not found.');
  },

  // Handle all unhandled errors.
  function unhandledErrorMiddleware(
    err: ?Error, req: $Request, res: $Response, next: NextFunction) {
    if (err) {
      console.log(err);
      console.log(err.stack);
    }
    res.status(500).send('Sorry, an unexpected error occurred.');
  },
];

export default (errorHandlersMiddleware: Array<Middleware>);
