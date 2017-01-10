import reduce from 'lodash/reduce';

/**
 * Helpers to enable Immutable-JS compatibility.
 */

function stringifiedArray(array) {
  return array.map(item => item && item.toString());
}

/**
 * To avoid including immutable-js as a dependency, check if an object is
 * immutable by checking if it implements the getIn method.
 *
 * @param  {Any} object
 * @return {Boolean}
 */
export function isImmutable(object) {
  return object && !!object.getIn;
}

/**
 * If the object responds to getIn, that's called directly. Otherwise
 * recursively apply object/array access to get the value.
 *
 * @param  {Object, Immutable.Map, Immutable.Record} object
 * @param  {Array<string, number>} keyPath
 * @return {Any}
 */
export function getIn(object, keyPath) {
  if (object.getIn) {
    return object.getIn(stringifiedArray(keyPath));
  }

  return reduce(
    keyPath,
    (memo, key) => memo[key],
    object,
  );
}

/**
 * If the object responds to setIn, that's called directly. Otherwise
 * recursively apply object/array access and set the value at that location.
 *
 * @param  {Object, Immutable.Map, Immutable.Record} object
 * @param  {Array<string, number>} keyPath
 * @param  {Any} value
 * @return {Any}
 */
export function setIn(object, keyPath, value) {
  if (object.setIn) {
    return object.setIn(stringifiedArray(keyPath), value);
  }

  const lastKey = keyPath.pop();
  const location = getIn(object, keyPath);

  location[lastKey] = value;

  return object;
}

export const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj)
    // Filter out the key from the object
    .filter(key => key !== deleteKey.toString())
    // Create new object without that key.
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
    }, {});
};
export const requiredParam = (name) => {
  throw new Error(`Missing paramater ${name}`);
};

export const uniqueArray = (oldValues, newValues) => {
  const arr = [...oldValues, ...newValues];
  const uniqueArray = arr.filter((it, i, ar) => ar.indexOf(it) === i);
  return uniqueArray;
};

export const validateId = (id, errorMessage) => {
  if (!id || isNaN(parseInt(id, 10))) {
    console.error('Invalid or missing id');
    throw new Error(errorMessage || 'Invalid or missing id');
  }
};

export const validateArray = (arr, errorMessage) => {
  if (!Array.isArray(arr)) {
    console.error('Invalid array');
    throw new Error(errorMessage || 'Expected a valid array');
  }
};
export const addIdToArray = (arr, idToAdd) => {
  validateArray(arr, 'You have to provide an array as first paramter.');
  validateId(idToAdd, 'You have to provide a valid id as second paramter.');

  // Only add the value if it is not there yet.
  if (arr.indexOf(idToAdd) === -1) {
    arr = [...arr, idToAdd];
  }

  return arr;
};

// Create shallow copy of an array, but without provided id.
export const removeIdFromArray = (arr, id) => {
  validateArray(arr);
  validateId(id);

  const idIndex = arr.indexOf(id);
  return [
    ...arr.slice(0, idIndex),
    ...arr.slice(idIndex + 1),
  ];
};

export const removeKeyFromNestedArray = ({
  obj = requiredParam('obj'),
  id = requiredParam('id'),
  arrayName = requiredParam('arrayName'),
  deleteKey = requiredParam('deleteKey'),
}) => {
  return {
    ...obj,
    [id]: {
      ...obj[id],
      [arrayName]: removeIdFromArray(obj[id][arrayName], deleteKey),
    },
  };
};
