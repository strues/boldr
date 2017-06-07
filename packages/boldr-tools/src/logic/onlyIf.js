const R = require('ramda');

const execIfFunc = x => (typeof x === 'function' ? x() : x);

// :: (() => Any)|Any, () => Any)|Any) -> Any
module.exports = R.curry(
  (condition, value) => (execIfFunc(condition) ? execIfFunc(value) : undefined),
);
