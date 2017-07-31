/* eslint-disable no-undefined */
/* @flow */

/**
 * Utility function to execute callback for eack key->value pair.
 * @param  {Object}   obj      The object we're forEaching
 * @param  {Function} callback callback function
 */
export function forEach(obj: Object, callback: Function) {
  if (obj) {
    for (const key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

export function hasProperty(obj: Object, property: string) {
  let result = false;
  if (obj) {
    for (const key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
    }
  }
  return result;
}

/**
 * The function returns true if the string passed to it has no content.
 * @param  {string}  str the string being checked for emptiness
 * @return {Boolean}     true if empty
 */
export function isEmptyString(str: string): boolean {
  // eslint-disable-next-line
  if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
    return true;
  }
  return false;
}

/**
 * The function will return true for simple javascript object, which is
 * not any other built in type like Array.
 * @param  {Object}  obj  the object we're checking
 * @return {Boolean}    true if is map
 */
export function isMap(obj: Object) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * The function will return filter out props fron and return new props.
 * @param  {Object} obj  the object we're filtering
 * @param  {Array<string>} keys the keys we're filtering by
 * @return {Object}      the filtered new object
 */
export function filter(obj: Object, keys: Array<string>) {
  const filteredKeys = Object.keys(obj).filter(key => keys.indexOf(key) < 0);
  const filteredObject = {};
  if (filteredKeys && filteredKeys.length > 0) {
    filteredKeys.forEach(key => {
      filteredObject[key] = obj[key];
    });
  }
  return filteredObject;
}

export function stopPropagation(event: Event) {
  event.stopPropagation();
}

/**
 * This function is used when displaying options in drop-down.
 * Icon for first available options is used in drop-down placeholder.
 * @param  {Object} config the config object
 * @return {string}        the icon
 */
export const getFirstIcon = (config: Object) => config[config.options[0]].icon;

/**
 * The function is used to recursively merge toolbar options. It assumes all the options
 * are peresent in obj1. It recursively merges objects but not arrays.
 * @param  {Object} obj1 the first object we're merging
 * @param  {Object} obj2 the second object we're merging
 * @return {Object}      the new merged object
 */
export const mergeRecursive = (obj1: Object, obj2: Object) => {
  if (obj1 && obj2 === undefined) {
    return obj1;
  }
  const mergedValue = {};
  forEach(obj1, (key, value) => {
    if (isMap(value)) {
      mergedValue[key] = mergeRecursive(value, obj2[key]);
    } else {
      mergedValue[key] = obj2[key] !== undefined ? obj2[key] : value;
    }
  });
  return mergedValue;
};
