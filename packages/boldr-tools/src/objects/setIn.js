const stringifiedArray = require('../arrays/stringifiedArray');
const getIn = require('./getIn');

/**
 * If the object responds to setIn, that's called directly. Otherwise
 * recursively apply object/array access and set the value at that location.
 *
 * @param  {Object, Immutable.Map, Immutable.Record} object
 * @param  {Array<string, number>} keyPath
 * @param  {Any} value
 * @return {Any}
 */
module.exports = function setIn(object, keyPath, value) {
  if (object.setIn) {
    return object.setIn(stringifiedArray(keyPath), value);
  }

  const lastKey = keyPath.pop();
  const location = getIn(object, keyPath);

  location[lastKey] = value;

  return object;
};
