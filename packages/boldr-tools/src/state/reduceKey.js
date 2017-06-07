/**
 * Takes a period delimited string or a list of keys (in order) to
 * extract a state's value from the store.
 *
 * ```js
 * state = { posts: { ids: [], all: {} } };
 *
 * // equivalent
 * reduceKey(state, 'posts.ids'); // -> [];
 * reduceKey(state, ['posts', 'ids']; // -> []
 * ```
 *
 * @param {Object} globalState - the full reduce or state object to
 * extract a value from.
 * @param {String|Array.<String>} fullStateKey - either a period delimtied
 * stirng or a list of
 *    keys to use.
 * @return the value in the global state or undefined if it did not exist.
 */
module.exports = function reduceKey(globalState, fullStateKey) {
  return (typeof fullStateKey === 'string' ? fullStateKey.split('.') : fullStateKey)
    .filter(key => !!key)
    .reduce((state, key) => state && state[key], globalState);
};
