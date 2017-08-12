/* eslint-disable func-names */
const curry = binaryFn => {
  return function(firstArg) {
    return function(secondArg) {
      return binaryFn(firstArg, secondArg);
    };
  };
};

module.exports = curry;
