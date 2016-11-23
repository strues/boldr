const path = require('path');
const appRoot = require('app-root-dir');

const appRootPath = appRoot.get();
const apiDir = 'api';
const cmsDir = 'cms';
const srcDir = 'src';

module.exports = {
  files: {
    assets: 'assets.json',
    defaultConfig: 'default',
    envmap: 'envmap',
    dll: 'vendor',
    dllHash: 'vendor.hash.json',
    dllManifest: 'vendor.manifest.json',
    dllExcludes: []
  },
  dirs: {
    src: 'src',
    client: 'client',
    server: 'server',
    shared: 'common',
    ssr: 'ssrMiddleware',
    dll: 'dlls',
    sw: 'serviceWorker',
  },
  paths: {
    node_modules: path.resolve(appRootPath, './node_modules'),
    build: path.resolve(appRootPath, './boldrCMS'),
    tools: path.resolve(appRootPath, './tools'),
    public: path.resolve(appRootPath, './public'),
    src: path.resolve(appRootPath, './src'),
  },
  modes: {
    default: 'development',
    production: 'production',
  }
}
