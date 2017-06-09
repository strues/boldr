'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable require-await */


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug3.default)('boldr:dx:services:hotNode');

var DevServer = function () {
  function DevServer(serverCompiler, clientCompiler) {
    var _this = this;

    _classCallCheck(this, DevServer);

    var compiledEntryFile = _path2.default.resolve(_appRoot2.default.get(), serverCompiler.options.output.path, 'server.js');

    var startServer = function () {
      return new Promise(function ($return, $error) {
        var newServer;

        _newArrowCheck(this, _this);

        return this.prepareMiddlewares(serverCompiler).then(function ($await_6) {
          if (this.server) {
            this.server.kill();
            this.server = null;
            _logger2.default.info('Restarting server...');
          }

          newServer = (0, _child_process.spawn)('node', ['--inspect', compiledEntryFile, '--colors'], {
            stdio: [process.stdin, process.stdout, 'pipe']
          });

          _logger2.default.end('Server running with latest changes.');

          newServer.stderr.on('data', function (data) {
            _newArrowCheck(this, _this);

            process.stderr.write('\n');
            process.stderr.write(data);
            process.stderr.write('\n');
          }.bind(this));
          this.server = newServer;
          return $return();
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }.bind(this);

    var waitForClientThenStartServer = function () {
      _newArrowCheck(this, _this);

      if (this.serverCompiling) {
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 40);
      } else {
        startServer();
      }
    }.bind(this);

    clientCompiler.plugin('compile', function () {
      _newArrowCheck(this, _this);

      _logger2.default.info('Building a new client bundle...');
      this.clientCompiling = true;
    }.bind(this));

    clientCompiler.plugin('done', function (stats) {
      _newArrowCheck(this, _this);

      _logger2.default.task('Client bundle compiled.');
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    }.bind(this));

    serverCompiler.plugin('compile', function () {
      _newArrowCheck(this, _this);

      this.serverCompiling = true;
      _logger2.default.info('Building a new server bundle...');
    }.bind(this));

    serverCompiler.plugin('done', function (stats) {
      _newArrowCheck(this, _this);

      this.serverCompiling = false;

      if (this.exiting) {
        return;
      }

      try {
        if (stats.hasErrors()) {
          _logger2.default.error('Build failed, check the console for more information.');
          debug(stats.toString());
          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
        _logger2.default.error('Startup failed. ' + String(err));
        process.exit(1);
      }
    }.bind(this));

    this.watcher = serverCompiler.watch(null, function () {
      _newArrowCheck(this, _this);
    }.bind(this));
  }

  _createClass(DevServer, [{
    key: 'prepareMiddlewares',
    value: function prepareMiddlewares(serverCompiler) {
      return new Promise(function ($return, $error) {
        var _this2 = this;

        serverCompiler.plugin('after-emit', function (compilation, callback) {
          _newArrowCheck(this, _this2);

          var assets = compilation.assets;

          if (this.prevAssets) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Object.keys(assets)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var f = _step.value;

                deleteCache(assets[f].existsAt);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Object.keys(this.prevAssets)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _f = _step2.value;

                if (!assets[_f]) {
                  deleteCache(this.prevAssets[_f].existsAt);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
          this.prevAssets = assets;

          callback();
        }.bind(this));
        return $return();
      }.$asyncbind(this));
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      var _this3 = this;

      this.exiting = true;

      var stopWatcher = new Promise(function (resolve) {
        _newArrowCheck(this, _this3);

        this.watcher.close(resolve);
      }.bind(this));

      return stopWatcher.then(function () {
        _newArrowCheck(this, _this3);

        if (this.server) {
          this.server.kill();
        }
      }.bind(this));
    }
  }]);

  return DevServer;
}();

function deleteCache(path) {
  delete require.cache[path];
}

exports.default = DevServer;