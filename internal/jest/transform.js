/* @flow */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'babel-preset-boldr/node',
      {
        targets: {
          node: 'current',
        },
        modules: 'commonjs',
        styled: true,
        universal: true,
      },
    ],
  ],
});
