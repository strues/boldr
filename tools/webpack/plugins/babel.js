const defs = require('../../config/defs');
const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../../utils');

const isDev = process.env.NODE_ENV === 'development';
const isClient = true;
const ifDevClient = ifElse(isDev && isClient);

const babelModuleResolve =
  ['module-resolver', {
    root: [`${defs.paths.src}/common`]
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
