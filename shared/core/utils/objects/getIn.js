import reduce from 'lodash/reduce';
import stringifiedArray from '../arrays/stringifiedArray';

/**
 * If the object responds to getIn, that's called directly. Otherwise
 * recursively apply object/array access to get the value.
 *
 * @param  {Object, Immutable.Map, Immutable.Record} object
 * @param  {Array<string, number>} keyPath
 * @return {Any}
 */
export default function getIn(object, keyPath) {
  if (object.getIn) {
    return object.getIn(stringifiedArray(keyPath));
  }

  return reduce(
    keyPath,
    (memo, key) => memo[key],
    object,
  );
}
