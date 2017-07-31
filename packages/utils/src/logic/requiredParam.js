/**
 * Helper to throw an error if a param is not provided
 * @param  {string} name the required paramenter
 * @return {Error}      throws an error if the param is missing
 */
module.exports = function requiredParam(name) {
  throw new Error(`Missing paramater ${name}`);
};
