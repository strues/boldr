module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
   sourceType: "module",
   codeFrame: true
 },
  extends: ['boldr', 'boldr/react', 'boldr/flowtype', 'boldr/import'],
  globals: {
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    jest: true,
    describe: true,
    test: true,
    it: true,
    expect: true,
    beforeEach: true,
  },
  rules: {
    'getter-return': 0,
    'react/default-props-match-prop-types': 0,
    'prefer-destructuring': 0,
    'no-undefined': 0
  },
};
