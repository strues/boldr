/**
 * Rather than require(package).default, this function
 * allows you to getDefault(require(pack))
 *
 * @param  module   an es6 module youre requiring within a
 * commonjs environment
 *
 */
module.exports = function getDefault(module) {
  return module.default || module;
};
