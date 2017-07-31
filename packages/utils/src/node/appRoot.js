/* eslint-disable no-multi-assign, prefer-template */
const GLOBAL_KEY = 'appRoot';
let _rootDir;

exports.get = function() {
  const dir = global.GLOBAL_KEY;
  if (dir) {
    return dir;
  }

  if (_rootDir === undefined) {
    const fs = require('fs');
    const path = require('path');
    const NODE_MODULES = path.sep + 'node_modules' + path.sep;
    const cwd = process.cwd();
    let pos = cwd.indexOf(NODE_MODULES);
    if (pos !== -1) {
      _rootDir = cwd.substring(0, pos);
    } else if (fs.existsSync(path.join(cwd, 'package.json'))) {
      _rootDir = cwd;
    } else {
      pos = __dirname.indexOf(NODE_MODULES);
      if (pos === -1) {
        _rootDir = path.normalize(path.join(__dirname, '..'));
      } else {
        _rootDir = __dirname.substring(0, pos);
      }
    }
  }

  return _rootDir;
};

exports.set = function(dir) {
  global.GLOBAL_KEY = _rootDir = dir;
};
