const path = require('path');
const loaderUtils = require('loader-utils');
const appRoot = require('boldr-utils/lib/node/appRoot');

const CWD = appRoot.get();
const HASH_TYPE = 'sha256';
const DIGEST_TYPE = 'base62';
const DIGEST_LENGTH = 4;
const SCRIPT_EXTENSIONS = new Set(['.js', '.jsx']);
const SKIP_FOLDERS = ['src', 'build', 'server', 'internal', 'public', 'coverage', 'flow-typed'];

function generateChunkName(request, rawRequest) {
  // Strip prefixed loader syntax from Webpack
  const splittedRequest = request.split('!');
  const cleanRequest = splittedRequest[splittedRequest.length - 1];

  // Getting relative path inside working directory
  let relative = path.relative(CWD, cleanRequest);

  const isExternal = relative.startsWith(`node_modules${path.sep}`);
  if (isExternal) {
    // if the module is an DelegatedModule, the rawRequest will be undefined since it does not have this property.
    // However, the userRequest property can supplement rawRequest in this situation
    relative = rawRequest || request;
  }

  // Strip useless helper folder structure
  SKIP_FOLDERS.forEach(filter => {
    relative = relative.replace(
      new RegExp(`(^|/|\\\\)${filter}($|/|\\\\)`),
      (match, group1) => group1,
    );
  });

  // Strip all script file extensions
  const fileExt = path.parse(relative).ext;
  if (SCRIPT_EXTENSIONS.has(fileExt)) {
    relative = relative.replace(new RegExp(`${fileExt}$`), '');
  }

  const hash = loaderUtils.getHashDigest(cleanRequest, HASH_TYPE, DIGEST_TYPE, DIGEST_LENGTH);
  const base = path.basename(relative);

  const result = `${base}-${hash}`;

  return result;
}

module.exports = class ChunkNames {
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('optimize', () => {
        compilation.chunks.forEach(chunk => {
          const { entryModule } = chunk;
          if (entryModule) {
            const { userRequest, rawRequest } = entryModule;
            const oldName = chunk.name;
            // eslint-disable-next-line eqeqeq
            if (userRequest && oldName == null) {
              chunk.name = generateChunkName(userRequest, rawRequest);
            }
          }
        });
      });
    });
  }
};
