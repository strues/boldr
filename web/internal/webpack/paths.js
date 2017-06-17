const path = require('path');
const fs = require('fs');

const ROOT_DIR = fs.realpathSync(process.cwd());

function resolveProject(relativePath) {
  return path.resolve(ROOT_DIR, relativePath);
}

module.exports = {
  distDir: resolveProject('dist'),
  srcDir: resolveProject('src'),
  staticDir: resolveProject('dist/static'),
  clientEntry: resolveProject('src/client/index.js'),
  serverDir: resolveProject('src/server'),
  serverEntry: resolveProject('src/server/render.js'),
  nodeModulesDir: resolveProject('node_modules'),
  cacheDir: resolveProject('node_modules/.boldr_cache'),
};
