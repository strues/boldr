const path = require('path');
const appRootDir = require('app-root-dir');
const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../../utils');

const isDev = process.env.NODE_ENV === 'development';
const isClient = true;
const ifDevClient = ifElse(isDev && isClient);
const rootDir = appRootDir.get();
const src = path.resolve(rootDir, './src');
const babelModuleResolve =
  ['module-resolver', {
    root: [`${src}/common`]
  }];

const babelDevClient = removeEmpty([
  // 'transform-class-properties',
  // 'transform-decorators-legacy',
  // 'transform-object-rest-spread',
  ifDevClient('react-hot-loader/babel'),
  babelModuleResolve
]);

const babelProd = {
  babelrc: false,
  presets: [['boldr', { 'es2015': { 'modules': false }}]],
  plugins: removeEmpty([
    babelModuleResolve
  ])
}

module.exports = {
  babelModuleResolve,
  babelDevClient,
  babelProd,
}
