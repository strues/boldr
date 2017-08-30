/**
 * Asynchrnously loads the given import and returns a Promise.
 *
 * Acts on transpiled `import()` statements from
 * [babel-plugin-universal-import](https://www.npmjs.com/package/babel-plugin-universal-import).
 *
 * @param {Object} wrapped The return value from transpiled `import()` statements.
 * @returns {Promise} Promise which resolves with the default import of imported file (asynchronous, lazy loaded).
 */
export function loadImport(wrapped) {
  return wrapped.then(module => {
    return module && module.__esModule ? module.default : module;
  });
}

/**
 * Pre-loads the module directly on the client without direct usage.
 *
 * Acts on transpiled `import()` statements from
 * [babel-plugin-universal-import](https://www.npmjs.com/package/babel-plugin-universal-import).
 *
 * @param {Object} wrapped The return value from transpiled `import()` statements.
 * @returns {Promise} Returns the promise for notification when preloading is ready.
 */
export function preloadImport(wrapped) {
  return wrapped.load();
}
