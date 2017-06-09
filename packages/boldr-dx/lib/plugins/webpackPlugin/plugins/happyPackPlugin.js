'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = happyPackPlugin;
/* eslint-disable babel/new-cap */
var os = require('os');
var path = require('path');
var HappyPack = require('happypack');

function happyPackPlugin(_ref) {
  var name = _ref.name,
      loaders = _ref.loaders;

  var compilerThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length - 2
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders: loaders
  });
}