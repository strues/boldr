const path = require('path');
const os = require('os');
const appRootDir = require('app-root-dir');

const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../../utils');
const isDev = process.env.NODE_ENV === 'development';
const isClient = true;
const ifDevClient = ifElse(isDev && isClient);

const rootdir = appRootDir.get();
const nodem = path.resolve(rootdir, './node_modules');

const happyCSSPlugin = happyPackPlugin({
  name: 'happypack-devclient-css',
  loaders: [
    { path: 'style-loader' },
    {
      path: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: '[local]__[hash:base64:5]',
        modules: true,
        sourceMap: true
      }
    },
    { path: 'postcss-loader' },
    {
      path: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap: true
      }
    }
  ]
});

const happyJSPlugin = (babelPlugin) => happyPackPlugin({
  name: 'happypack-javascript',
  loaders: [{
    path: 'babel-loader',
    query: {
      babelrc: false,
      cacheDirectory: path.resolve(nodem, 'boldr', 'babelc'),
      presets: [['boldr', { 'es2015': { 'modules': false }}]],
      plugins: babelPlugin
    },
  }],
});

module.exports = {
  happyCSSPlugin,
  happyJSPlugin
};
