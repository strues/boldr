module.exports = function addIdToArray(arr, idToAdd) {
  // Only add the value if it is not there yet.
  if (arr.indexOf(idToAdd) === -1) {
    arr = [...arr, idToAdd];
  }

  return arr;
};
