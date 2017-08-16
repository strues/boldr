/**
 * debug utility for both browser and node.
 * Big thank you to Semantic-UI-React
 * https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/debug.js
 * @type {[type]}
 */
const isBrowser = require('./isBrowser');
const logger = require('./logger');

let _debug;
const noop = () => undefined;

if (isBrowser && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  // Heads Up!
  // https://github.com/visionmedia/debug/pull/331
  //
  // debug now clears storage on load, grab the debug settings before require('debug').
  // We try/catch here as Safari throws on localStorage access in private mode or with cookies disabled.
  let DEBUG;
  try {
    DEBUG = window.localStorage.debug;
  } catch (e) {
    /* eslint-disable no-console */
    logger.debug('Debug unavailable.');
    logger.debug(e);
    /* eslint-enable no-console */
  }

  _debug = require('debug');

  // enable what ever settings we got from storage
  _debug.enable(DEBUG);
} else {
  _debug = () => noop;
}

/**
 * Create a namespaced debug function.
 * @param {String} namespace Usually a component name.
 * @example
 * import { makeDebugger } from 'src/lib'
 * const debug = makeDebugger('namespace')
 *
 * debug('Some message')
 * @returns {Function}
 */
const makeDebugger = namespace => _debug(`boldr:${namespace}`);

/**
 * Default debugger, simple log.
 * @example
 * import { debug } from 'src/lib'
 * debug('Some message')
 */
const debug = makeDebugger('log');

module.exports = { makeDebugger, debug };
