/**
 * Helpers to enable Immutable-JS compatibility.
 */

module.exports = function stringifiedArray(array) {
  return array.map(item => item && item.toString());
};
