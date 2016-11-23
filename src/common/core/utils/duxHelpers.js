const defaultIsCached = obj => !!obj;

const generateConstantFromString = string => string.replace(/([A-Z])/g, $1 => `_${$1}`).toUpperCase();

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const serializeOrderedQuery = (query = {}) => (
    Object.keys(query)
        .sort()
        .map(key => `key=${JSON.stringify(query[key])}`)
        .join('&')
);


const removeFromArray = (value, array) => {
  const valueIndex = array.indexOf(value);
  if (valueIndex === -1) return array;
  return [
    ...array.slice(0, valueIndex),
    ...array.slice(valueIndex + 1),
  ];
};

const addToArray = (value, array) => {
  const valueIndex = array.indexOf(value);
  if (valueIndex !== -1) return array;
  return [...array, value];
};

export {
  defaultIsCached,
  generateConstantFromString,
  capitalize,
  serializeOrderedQuery,
  removeFromArray,
  addToArray,
};
