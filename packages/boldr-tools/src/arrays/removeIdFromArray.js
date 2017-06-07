// Create shallow copy of an array, but without provided id.
const removeIdFromArray = (arr, id) => {
  const idIndex = arr.indexOf(id);
  return [...arr.slice(0, idIndex), ...arr.slice(idIndex + 1)];
};

module.exports = removeIdFromArray;
