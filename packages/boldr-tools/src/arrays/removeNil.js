/* eslint-disable eqeqeq */
// :: Array<?A> -> Array<A>
module.exports = function removeNil(as) {
  return as.filter(a => a != null);
};
