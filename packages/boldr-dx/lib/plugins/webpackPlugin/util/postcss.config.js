'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

// webpack.config.js
// https://github.com/postcss/postcss-loader/tree/v2.0.5
var path = require('path');

module.exports = function (loader) {
  _newArrowCheck(undefined, undefined);

  return [require('postcss-import')(), require('postcss-cssnext')({ browsers: ['> 1%', 'last 2 versions'] })];
}.bind(undefined);