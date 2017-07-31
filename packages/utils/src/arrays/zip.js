const zip = (leftArr, rightArr, fn) => {
  let index;
  const results = [];

  for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
    results.push(fn(leftArr[index], rightArr[index]));
  }

  return results;
};

module.exports = zip;
