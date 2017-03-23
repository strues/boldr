const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        node: 'current',
        exclude: ['transform-regenerator', 'transform-async-to-generator'],
        debug: false,
      },
    ],
  ],
  plugins: [
    'syntax-async-functions',
    'fast-async',
    'transform-flow-strip-types',
    'transform-object-rest-spread',
    'transform-class-properties',
  ],
});
