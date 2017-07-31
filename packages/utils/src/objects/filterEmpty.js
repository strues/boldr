/**
 * Filters empty keys from an object. Creates a new object.
 * @param  {Object} obj the object
 * @return {Object}     the new object without missing keys
 */
module.exports = function filterEmpty(obj) {
  const copy = {};
  for (const key in obj) {
    // eslint-disable-next-line eqeqeq
    if (!(obj[key] === null || obj[key].length === 0)) {
      copy[key] = obj[key];
    }
  }

  return copy;
};
