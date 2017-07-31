const util = require('util');
/**
 * Log objects in their entirety so we can see everything in debug output.
 */
module.exports = function logDeep(object) {
  return util.inspect(object, { colors: true, depth: null });
};
