'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function merge(a, b) {
  const typeA = Array.isArray(a) ? 'array' : typeof a;
  const typeB = Array.isArray(b) ? 'array' : typeof b;

  if (typeA !== typeB || typeA === 'undefined') {
    return b;
  }

  if (typeB === 'undefined') {
    return a;
  }

  if (typeA === 'object') {
    const merged = _extends({}, a);

    for (const k of Object.keys(b)) {
      merged[k] = merge(a[k], b[k]);
    }

    return merged;
  } else if (typeA === 'array') {
    return a.concat(b);
  }

  return b;
};