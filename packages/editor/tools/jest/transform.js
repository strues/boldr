const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'babel-preset-env',
      {
        modules: 'commonjs',
      },
    ],
    'stage-1',
    'react',
  ],
  plugins: ['transform-flow-strip-types', 'transform-class-properties'],
});
