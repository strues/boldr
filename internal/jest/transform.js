const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'babel-preset-boldr',
      {
        useBuiltins: true,
        faSpecMode: true,
        looseMode: true,
        specMode: false,
        nodentRt: false,
        polyfill: false,
        target: '8.4',
        modules: 'commonjs',
        imports: 'rollup-nodejs',
        styled: false,
      },
    ],
  ],
});
