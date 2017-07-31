const requiredParam = require('../logic/requiredParam');
const removeIdFromArray = require('./removeIdFromArray');

const removeKeyFromNestedArray = ({
  obj = requiredParam('obj'),
  id = requiredParam('id'),
  arrayName = requiredParam('arrayName'),
  deleteKey = requiredParam('deleteKey'),
}) => {
  return {
    ...obj,
    [id]: {
      ...obj[id],
      [arrayName]: removeIdFromArray(obj[id][arrayName], deleteKey),
    },
  };
};

module.exports = removeKeyFromNestedArray;
