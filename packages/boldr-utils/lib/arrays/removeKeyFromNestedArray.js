'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const requiredParam = require('../logic/requiredParam');
const removeIdFromArray = require('./removeIdFromArray');

const removeKeyFromNestedArray = ({
  obj = requiredParam('obj'),
  id = requiredParam('id'),
  arrayName = requiredParam('arrayName'),
  deleteKey = requiredParam('deleteKey')
}) => {
  return _extends({}, obj, {
    [id]: _extends({}, obj[id], {
      [arrayName]: removeIdFromArray(obj[id][arrayName], deleteKey)
    })
  });
};

module.exports = removeKeyFromNestedArray;