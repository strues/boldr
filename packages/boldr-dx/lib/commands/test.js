'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jest = require('jest');

var _jest2 = _interopRequireDefault(_jest);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

module.exports = function (config, flags) {
  _newArrowCheck(undefined, undefined);

  // set BABEL_ENV to test if undefined
  process.env.BABEL_ENV = process.env.BABEL_ENV || 'test';
  // Run Jest
  var argv = process.argv.slice(2);

  // Watch unless on CI
  if (!process.env.CI) {
    argv.push('--watch');
  }

  var rootDir = process.cwd();
  var setupTestsFile = _pathExists2.default.sync(_path2.default.resolve(rootDir, './.boldr/setupTests.js')) ? '<rootDir>/.boldr/setupTests.js' : undefined;

  argv.push('--config', JSON.stringify({
    rootDir: rootDir,
    moduleFileExtensions: ['jsx', 'js', 'json'],
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('../config/jest/fileMock.js'),
      '\\.(css|scss)$': require.resolve('identity-obj-proxy')
    },
    transform: {
      '.js': require.resolve('../config/jest/transform.js')
    },
    setupFiles: [
      /* require.resolve('./jest/polyfills.js') */
    ],
    snapshotSerializers: [require.resolve('enzyme-to-json')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testRegex: '.*.test\\.js',
    testPathIgnorePatterns: ['<rootDir>/(lib|internal|config|docs|dist|bin|.idea|public|db)/', '__snapshots__', '/styles/'],
    transformIgnorePatterns: ['/node_modules/', '/styles/']
  }));

  _jest2.default.run(argv);
}.bind(undefined);