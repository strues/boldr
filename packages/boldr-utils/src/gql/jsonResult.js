const invokeMap = require('lodash.invokemap');

const jsonResult = a => {
  return Array.isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON();
};

module.exports = jsonResult;
