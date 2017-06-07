/* eslint-disable babel/new-cap */
const os = require('os');
const path = require('path');
const HappyPack = require('happypack');

module.exports = function happyPackPlugin({ name, loaders }) {
  const compilerThreadPool = HappyPack.ThreadPool({
    size: 4,
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders,
  });
};
