const invokeMap = require('lodash/invokeMap');
const isArray = require('lodash/isArray');

const jsonResult = a => {
  return isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON();
};

module.exports = jsonResult;
