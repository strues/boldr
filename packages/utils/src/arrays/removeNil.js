/* eslint-disable eqeqeq, no-eq-null */
// :: Array<?A> -> Array<A>
module.exports = function removeNil(as) {
  return as.filter(a => a != null);
};
