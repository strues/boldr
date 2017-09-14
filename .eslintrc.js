module.exports = {
  extends: ['boldr', 'boldr/react', 'boldr/flowtype', 'boldr/import', 'boldr/promise'],
  root: true,
  globals: {
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
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
    'react/boolean-prop-naming': 0,
    'react/no-typos': 0,
    'valid-jsdoc': 0,
    'no-implicit-coercion': 0,
  },
};
