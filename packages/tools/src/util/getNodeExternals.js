/* eslint-disable */
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { readJsonSync } from 'fs-extra';

const blacklist = ['freelist', 'sys'];

// Inspired by https://github.com/sindresorhus/builtin-modules
const builtinModules = Object.keys(process.binding('natives'))
  .filter(el => {
    return !/^_|^internal|\//.test(el) && blacklist.indexOf(el) === -1;
  })
  .sort();

const root = 'node_modules';

const BuiltIns = new Set(builtinModules);
const Modules = new Set();
const Binaries = new Set();
const WebpackRequired = new Set(['react-universal-component', 'webpack-flush-chunks']);

const nodePackages = readdirSync(root).filter(dirname => dirname.charAt(0) !== '.');

nodePackages.forEach(packageName => {
  var json;
  try {
    json = readJsonSync(resolve(root, packageName, 'package.json'));
  } catch (error) {
    return;
  }

  if (json.module || json.style || json['jsnext:main']) {
    Modules.add(packageName);
  }

  // Configuration for Node-Pre-Gyp
  // See also: https://www.npmjs.com/package/node-pre-gyp
  if (json.binary != null) {
    Binaries.add(packageName);
  }
});

const Problematic = new Set([
  // "intl" is included in one block with complete data. No reason for bundle everything here.
  'intl',

  // "react-intl" for the same reason as "intl" - contains a ton of locale data
  'react-intl',

  // "mime-db" database for working with mime types. Naturally pretty large stuff.
  'mime-db',

  // "helmet" uses some look with require which are not solvable with webpack
  'helmet',

  // "express" also uses some dynamic requires
  'express',

  // "encoding" uses dynamic iconv loading
  'encoding',

  // "node-pre-gyp" native code module helper
  'node-pre-gyp',

  // Uses dynamic require expressions which do not work well with Webpack
  'ajv',

  // Uses dynamic require expressions which do not work well with Webpack
  'jsdom',
]);

console.log('ESM:', Modules);
console.log('Binaries:', Binaries);
console.log('Problematic:', Problematic);

export function isLoaderSpecificFile(request) {
  return Boolean(
    // eslint-disable-next-line max-len
    /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|gif|webp|webm|ico|mp4|mp3|ogg|html|pdf|swf|css|scss|sass|sss|less)$/.exec(
      request,
    ),
  );
}

export default function getNodeExternals(useLightNodeBundle) {
  // We can't influence a public interface
  // eslint-disable-next-line max-params
  return (context, request, callback) => {
    var basename = request.split('/')[0];

    // Externalize built-in modules
    if (BuiltIns.has(basename)) {
      return callback(null, `commonjs ${request}`);
    }

    // Externalize modules which depends on binary code
    if (Binaries.has(basename)) {
      return callback(null, `commonjs ${request}`);
    }

    // Make sure that problematic CommonJS code is externalized
    if (Problematic.has(basename)) {
      return callback(null, `commonjs ${request}`);
    }

    // Ignore all inline files for further processing
    if (basename.charAt(0) === '.') {
      return callback();
    }

    // But inline all es2015 modules
    if (Modules.has(basename)) {
      return callback();
    }

    // Also inline all modules which require a Webpack environment
    if (WebpackRequired.has(basename)) {
      return callback();
    }

    // Inline all files which are dependend on Webpack loaders e.g. CSS, images, etc.
    if (isLoaderSpecificFile(request)) {
      return callback();
    }

    // In all other cases follow the user given preference
    return useLightNodeBundle ? callback(null, `commonjs ${request}`) : callback();
  };
}
