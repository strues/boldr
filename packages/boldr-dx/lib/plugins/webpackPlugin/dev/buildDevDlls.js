'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _DllPlugin = require('webpack/lib/DllPlugin');

var _DllPlugin2 = _interopRequireDefault(_DllPlugin);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var debug = (0, _debug3.default)('boldr:dx:devDllPlugin');

function buildDevDlls(config) {
  var _this = this;

  _logger2.default.start('Building Webpack vendor DLLs');
  var pkg = JSON.parse(_fsExtra2.default.readFileSync(String(process.cwd()) + '/package.json', 'utf8'));

  var dllConfig = config.bundle.vendor;
  var devDLLDependencies = dllConfig.sort();

  // We calculate a hash of the package.json's dependencies, which we can use
  // to determine if dependencies have changed since the last time we built
  // the vendor dll.
  var currentDependenciesHash = (0, _md2.default)(JSON.stringify(devDLLDependencies.map(function (dep) {
    _newArrowCheck(this, _this);

    return [dep, pkg.dependencies[dep], pkg.devDependencies[dep]];
  }.bind(this))
  // We do this to include any possible version numbers we may have for
  // a dependency. If these change then our hash should too, which will
  // result in a new dev dll build.
  ));

  var vendorDLLHashFilePath = _path2.default.resolve(config.bundle.assetsDir, '__vendor_dlls__hash');

  function webpackInstance() {
    return {
      // We only use this for development, so lets always include source maps.
      devtool: 'inline-source-map',
      entry: _defineProperty({}, '__vendor_dlls__', devDLLDependencies),
      output: {
        path: config.bundle.assetsDir,
        filename: '__vendor_dlls__.js',
        library: '__vendor_dlls__'
      },
      plugins: [new _DllPlugin2.default({
        path: _path2.default.resolve(config.bundle.assetsDir, '__vendor_dlls__.json'),
        name: '__vendor_dlls__'
      })]
    };
  }

  function buildVendorDLL() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _newArrowCheck(this, _this2);

      _logger2.default.end('Vendor DLL build complete.');
      _logger2.default.info('The following dependencies have been\n        included:\n\t-' + String(devDLLDependencies.join('\n\t-')) + '\n');

      var webpackConfig = webpackInstance();
      var vendorDLLCompiler = (0, _webpack2.default)(webpackConfig);
      vendorDLLCompiler.run(function (err) {
        _newArrowCheck(this, _this2);

        if (err) {
          return reject(err);
        }
        // Update the dependency hash
        _fsExtra2.default.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

        return resolve();
      }.bind(this));
    }.bind(this));
  }

  return new Promise(function (resolve, reject) {
    _newArrowCheck(this, _this);

    if (!_fsExtra2.default.existsSync(vendorDLLHashFilePath)) {
      // builddll
      _logger2.default.task('Generating a new Vendor DLL.');
      return buildVendorDLL().then(resolve).catch(reject);
    }
    // first check if the md5 hashes match
    var dependenciesHash = _fsExtra2.default.readFileSync(vendorDLLHashFilePath, 'utf8');
    var dependenciesChanged = dependenciesHash !== currentDependenciesHash;

    if (dependenciesChanged) {
      _logger2.default.info('New vendor dependencies detected.');
      _logger2.default.task('Regenerating the vendor dll...');
      return buildVendorDLL().then(resolve).catch(reject);
    }
    _logger2.default.end('Dependencies did not change. Using existing vendor dll.');
    return resolve();
  }.bind(this));
}

exports.default = buildDevDlls;