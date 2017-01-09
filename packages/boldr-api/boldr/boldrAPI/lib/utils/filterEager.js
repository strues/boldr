'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEagerData(queryParams, relation, columnName) {
  if (!queryParams.where) {
    return function () {
      return undefined;
    };
  }
  var opMap = {
    gt: '>',
    lt: '<',
    eq: '='
  };
  // construct the keys that are in where condition in query parameters
  var keys = (0, _keys2.default)(opMap).map(function (op) {
    return relation + '.' + columnName + ':' + op;
  });

  var values = keys.map(function (key) {
    var value = queryParams.where[key];
    if (value !== undefined) {
      var opMarker = key.split(':')[1];
      return {
        op: opMap[opMarker],
        value: value
      };
    }
    return null;
  }).filter(function (key) {
    return key !== null;
  });

  return function filterEagerValues(builder) {
    return values.reduce(function (memo, value) {
      return memo.where(columnName, value.op, value.value);
    }, builder);
  };
}

exports.default = filterEagerData;