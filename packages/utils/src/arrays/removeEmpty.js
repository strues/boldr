const R = require('ramda');

module.exports = function removeEmpty(as) {
  return as.filter(a => R.not(R.isEmpty(a)));
};
