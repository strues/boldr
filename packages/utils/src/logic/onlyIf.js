const R = require('ramda');

const execIfFn = x => (typeof x === 'function' ? x() : x);

// :: (() => Any)|Any, () => Any)|Any) -> Any
const onlyIf = R.curry((condition, value) => (execIfFn(condition) ? execIfFn(value) : undefined));

module.exports = {
  onlyIf,
};
