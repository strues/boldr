const reduce = (array, fn, initialValue) => {
  let accumlator;

  if (initialValue != undefined) {
    accumlator = initialValue;
  } else {
    accumlator = array[0];
  }

  for (const value of array) {
    accumlator = fn(accumlator, value);
  }

  return [accumlator];
};

module.exports = reduce;
