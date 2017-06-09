'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _terminate = require('terminate');

var _terminate2 = _interopRequireDefault(_terminate);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _getDefault = require('boldr-utils/lib/node/getDefault');

var _getDefault2 = _interopRequireDefault(_getDefault);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loadConfig = require('../../config/loadConfig');

var _loadConfig2 = _interopRequireDefault(_loadConfig);

var _createSingleCompiler = require('./compilers/createSingleCompiler');

var _createSingleCompiler2 = _interopRequireDefault(_createSingleCompiler);

var _buildDevDlls = require('./dev/buildDevDlls');

var _buildDevDlls2 = _interopRequireDefault(_buildDevDlls);

var _createBrowserWebpack = require('./createBrowserWebpack');

var _createBrowserWebpack2 = _interopRequireDefault(_createBrowserWebpack);

var _createNodeWebpack = require('./createNodeWebpack');

var _createNodeWebpack2 = _interopRequireDefault(_createNodeWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }
};

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }
/* eslint-disable global-require, no-console, require-await */


var debug = (0, _debug3.default)('boldr:dx:plugins:webpack');

var plugin = function (engine) {
  var runOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  _newArrowCheck(undefined, undefined);

  var _engine$getConfigurat = engine.getConfiguration(),
      envVariables = _engine$getConfigurat.engine,
      bundle = _engine$getConfigurat.bundle;

  return {
    build: function build() {
      return new Promise(function ($return, $error) {
        var config = (0, _loadConfig2.default)(this);

        var clientConfig = (0, _createBrowserWebpack2.default)({
          config: config,
          mode: 'production',
          name: 'client'
        });
        var serverConfig = (0, _createNodeWebpack2.default)({
          config: config,
          mode: 'production',
          name: 'server'
        });

        _fsExtra2.default.removeSync(config.bundle.client.bundleDir);
        _fsExtra2.default.removeSync(config.bundle.server.bundleDir);

        var compilers = [(0, _createSingleCompiler2.default)(clientConfig), (0, _createSingleCompiler2.default)(serverConfig)];

        return $return(Promise.all(compilers));
      }.$asyncbind(this));
    },
    start: function start() {
      return new Promise(function ($return, $error) {
        return $return(Promise.resolve());
      }.$asyncbind(this));
    },
    dev: function dev() {
      return new Promise(function ($return, $error) {
        var _this, config, BoldrDev, devServer;

        _this = this;

        _logger2.default.start('Starting development bundling process.');
        config = engine.getConfiguration();
        return (0, _buildDevDlls2.default)(config).then(function ($await_1) {
          BoldrDev = (0, _getDefault2.default)(require('./dev/boldrDev'));

          devServer = new BoldrDev(config);

          ['SIGINT', 'SIGTERM'].forEach(function (signal) {
            _newArrowCheck(this, _this);

            process.on(signal, function () {
              _newArrowCheck(this, _this);

              devServer.shutdown();
              process.exit(0);
            }.bind(this));
          }.bind(this));

          process.on('exit', function () {
            _newArrowCheck(this, _this);

            _logger2.default.end('Development stopped. 💠  All listeners removed.');
          }.bind(this));
          return $return();
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    },
    end: function end() {
      return new Promise(function ($return, $error) {
        var _this2 = this;

        if (serverCompiler) {
          (0, _terminate2.default)(process.pid, function (err) {
            _newArrowCheck(this, _this2);

            if (err) {
              debug('ERR RESTART: ' + String(err));
            } else {
              _logger2.default.task('Terminated.');
            }
          }.bind(this));
        }

        return $return(true);
      }.$asyncbind(this));
    }
  };
}.bind(undefined);

module.exports = plugin;