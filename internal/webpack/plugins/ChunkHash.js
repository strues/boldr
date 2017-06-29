const loaderUtils = require('loader-utils');

function compareModules(left, right) {
  if (left.resource < right.resource) {
    return -1;
  }
  if (left.resource > right.resource) {
    return 1;
  }
  return 0;
}

function getModuleSource(module) {
  const source = module._source || {};
  return source._value || '';
}

function concatenateSource(result, moduleSource) {
  return result + moduleSource;
}

function ChunkHash() {
  // empty
}

const hashType = 'sha256';
const digestType = 'base62';
const digestLength = 8;

ChunkHash.prototype.apply = function(compiler) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('chunk-hash', (chunk, chunkHash) => {
      const source = chunk.modules
        .sort(compareModules)
        .map(getModuleSource)
        // we provide an initialValue in case there is an empty module source. Ref: http://es5.github.io/#x15.4.4.21
        .reduce(concatenateSource, '');

      const generatedHash = loaderUtils.getHashDigest(source, hashType, digestType, digestLength);
      chunkHash.digest = function() {
        return generatedHash;
      };
    });
  });
};

module.exports = ChunkHash;
