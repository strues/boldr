const defs = require('../../config/defs');
const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../../utils');

const isDev = process.env.NODE_ENV === 'development';
const isClient = true;
const ifDevClient = ifElse(isDev && isClient);

const babelModuleResolve =
  ['module-resolver', {
    root: [`${defs.paths.cms}/common`]
  }];

const babelDevClient = removeEmpty([
  'transform-class-properties',
  'transform-decorators-legacy',
  'transform-object-rest-spread',
  ifDevClient('react-hot-loader/babel'),
  babelModuleResolve
]);

const babelProd = {
  babelrc: false,
  presets: [['latest', { 'es2015': { 'modules': false }}], 'react'],
  plugins: removeEmpty([
    'transform-class-properties',
    'transform-decorators-legacy',
    'transform-object-rest-spread',
    'transform-flow-strip-types',
    'transform-react-constant-elements',
    babelModuleResolve
  ])
}

module.exports = {
  babelModuleResolve,
  babelDevClient,
  babelProd,
}
