/* eslint-disable babel/new-cap */
const os = require('os');
const path = require('path');
const HappyPack = require('happypack');

export default function happyPackPlugin({ name, loaders }) {
  const compilerThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length - 2,
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders,
  });
}
