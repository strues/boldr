module.exports = {
  extends: ['boldr', 'boldr/react', 'boldr/flowtype', 'boldr/import', 'boldr/promise'],
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
    beforeEach: true
  },
  rules: {
    'getter-return': 0
  }
}
