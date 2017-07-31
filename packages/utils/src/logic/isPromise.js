/**
 * Test whether an object could be a promise.
 * @param {Object} obj an object or function to check
 * @returns {bool} true if is a promise
 */
module.exports = function isPromise(obj) {
  return (
    Boolean(obj) &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};
