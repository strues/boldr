/**
 * Join multiple items with a penultimate "and".
 * @param {Array<*>} arr
 */
module.exports = function joinAnd(array) {
  if (array.length === 0) {
    return '';
  }
  if (array.length === 1) {
    return String(array[0]);
  }
  return `${array.slice(0, -1).join(', ')} and ${array[array.length - 1]}`;
};
