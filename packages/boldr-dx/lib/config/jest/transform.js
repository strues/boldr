'use strict';

var babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-boldr/server')],
  babelrc: false
});