/* @flow */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['env', 'boldr/node'],
});
