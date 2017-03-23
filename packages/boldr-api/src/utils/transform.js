import pickBy from 'lodash/pickBy';
/**
 * Deletes null keys from the object
 * @param {Object|Array} json
 * @returns {Object|Array}
 */
export function removeNullandUndef(json) {
  if (typeof json !== 'object' || json === null) return json;

  const isArray = Array.isArray(json);
  const keys = isArray ? json.keys() : Object.keys(json);
  const copy = isArray ? [...json] : Object.assign({}, json);

  for (const key of keys) {
    const value = copy[key];
    if (value === null) {
      if (isArray) copy[key] = undefined;
      else Reflect.deleteProperty(copy, key);
    } else if (typeof value === 'object') {
      copy[key] = removeNullandUndef(value);
    }
  }
  return copy;
}
/* istanbul ignore next */
function getErrorStatus(err) {
  /* istanbul ignore next */
  let errStatus = 500;
  if (err.name === 'error') {
    errStatus = 400;
  }
  return errStatus;
}
/* istanbul ignore next */
export function responseHandler(err, res, status, data) {
  if (err) {
    /* istanbul ignore next */
    const errStatus = getErrorStatus(err);
    return res.status(err.statusCode || errStatus || 500).send(
      pickBy({
        err: `${err.message}`,
        hint: `${err.hint || ''}`,
      }),
    );
  }
  /* istanbul ignore next */
  return res.status(status || 200).send(data);
}
/* istanbul ignore next */
export function throwNotFound(res) {
  const error = new Error('Not found');
  error.statusCode = 404;
  return responseHandler(error, res);
}
