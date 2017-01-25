import requiredParam from '../logic/requiredParam';
import removeIdFromArray from './removeIdFromArray';

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

export default removeKeyFromNestedArray;
