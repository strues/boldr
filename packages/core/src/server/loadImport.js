/* global __webpack_require__ */
import { CHUNK_NAMES } from 'react-universal-component';

/**
 * Synchronously loads the given module on the server.
 *
 * Acts on transpiled `import()` statements from
 * [babel-plugin-universal-import](https://www.npmjs.com/package/babel-plugin-universal-import).
 *
 * @param {Object} wrapped The return value from transpiled `import()` statements.
 * @returns {any} The default export of the imported file (synchronously loaded).
 */
export function loadImport(wrapped) {
  const module = __webpack_require__(wrapped.resolve());
  return module && module.__esModule ? module.default : module;
}

/**
 * Register the module for being pre-loaded on the *client*. This has no
 * effect on the server other than injecting the chunk name for flusing to
 * the generated HTML.
 *
 * Acts on transpiled `import()` statements from
 * [babel-plugin-universal-import](https://www.npmjs.com/package/babel-plugin-universal-import).
 *
 * @param {Object} wrapped The return value from transpiled `import()` statements.
 */
export function preloadImport(wrapped) {
  CHUNK_NAMES.add(wrapped.chunkName());
}
