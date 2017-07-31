const uniqueArray = (oldValues, newValues) => {
  const arr = [...oldValues, ...newValues];
  const uniqueArray = arr.filter((it, i, ar) => ar.indexOf(it) === i);
  return uniqueArray;
};

module.exports = uniqueArray;
