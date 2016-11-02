/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

let tempUniversalMiddleware;

if (process.env.NODE_ENV === 'development') {
  // In development mode we will use a special wrapper middleware which will
  // allow us to flush our node module cache effectively, and it will thereby
  // allow us to "hot" reload any updates to our universalMiddleware bundle.

  tempUniversalMiddleware =
    // This require should be relative to {projectroot}/build/server
    require('../../../tools/development/universalDevMiddleware');
} else {
  // In production we will just import our universal middleware directly.
  // Our server bundle will be flattened and in "build/server", therfore to import
  // the middleware we do a relative path to "../universalMiddleware" which
  // exists in "build/universalMiddleware".

  tempUniversalMiddleware =
    // This require should be relative to {projectroot}/build/server
    require('../universalMiddleware').default;
}

// eslint complains if you export a "let", so we will mount our middleware
// onto a "const"
const universalMiddleware = tempUniversalMiddleware;

export default universalMiddleware;
