const curry = binaryFn => {
  return function(firstArg) {
    return function(secondArg) {
      return binaryFn(firstArg, secondArg);
    };
  };
};

module.exports = curry;
