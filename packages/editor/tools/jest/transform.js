const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['react', 'stage-1', 'babel-preset-es2015'],
  plugins: ['transform-flow-strip-types', 'transform-class-properties'],
});
