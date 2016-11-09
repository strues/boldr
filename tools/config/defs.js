const path = require('path');
const appRootPath = require('app-root-path').toString();

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
    api: apiDir,
    cms: cmsDir,
    client: 'client',
    server: 'server',
    shared: 'common',
    ssr: 'ssrMiddleware',
    dll: 'dlls',
    sw: 'serviceWorker',
  },
  paths: {
    node_modules: path.resolve(appRootPath, './node_modules'),
    build: path.resolve(appRootPath, './build'),
    tools: path.resolve(appRootPath, './tools'),
    public: path.resolve(appRootPath, './public'),
    src: path.resolve(appRootPath, './src'),
    api: path.resolve(appRootPath, `./src/${apiDir}`),
    cms: path.resolve(appRootPath, `./src/${cmsDir}`),
  },
  modes: {
    default: 'development',
    production: 'production',
  }
}
