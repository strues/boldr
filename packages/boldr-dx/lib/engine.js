'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/* eslint-disable require-await */


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _terminate = require('terminate');

var _terminate2 = _interopRequireDefault(_terminate);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _loadConfig = require('./config/loadConfig');

var _loadConfig2 = _interopRequireDefault(_loadConfig);

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

var debug = (0, _debug3.default)('boldr:dx:engine');

var Engine = function () {
  // inputOptions is passed from the user
  // via a command.
  function Engine(cwd) {
    _classCallCheck(this, Engine);

    this.cwd = cwd;
    this.configFileName = './boldr.config.js';
  }

  _createClass(Engine, [{
    key: 'getConfigPath',
    value: function getConfigPath() {
      return _path2.default.resolve(this.cwd, './boldr.config.js');
    }
  }, {
    key: 'getInputOptions',
    value: function getInputOptions() {
      return this.inputOptions;
    }
  }, {
    key: 'getConfiguration',
    value: function getConfiguration() {
      return (0, _loadConfig2.default)(this);
    }

    // determine our NODE_ENV used as the identifier

  }, {
    key: 'getNodeEnv',
    value: function getNodeEnv() {
      debug('getNodeEnv: ', this.getConfiguration());
      return this.getConfiguration().env.NODE_ENV;
    }
  }, {
    key: 'build',
    value: function build() {
      return new Promise(function ($return, $error) {
        var _this, config, pluginControllers;

        _this = this;

        config = (0, _loadConfig2.default)(this);

        return Promise.all(config.plugins.map(function (plugin) {
          _newArrowCheck(this, _this);

          return plugin(this, true);
        }.bind(this))).then(function ($await_1) {
          pluginControllers = $await_1;

          return Promise.all(pluginControllers.map(function (pluginController) {
            _newArrowCheck(this, _this);

            return pluginController.build();
          }.bind(this))).then(function ($await_2) {
            return $return();
          }.$asyncbind(this, $error), $error);
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }, {
    key: 'dev',
    value: function dev() {
      return new Promise(function ($return, $error) {
        var _this2, config;

        _this2 = this;

        config = (0, _loadConfig2.default)(this);

        return Promise.all(config.plugins.map(function (plugin) {
          _newArrowCheck(this, _this2);

          return plugin(this, false);
        }.bind(this))).then(function ($await_3) {
          this.plugins = $await_3;

          return Promise.all(this.plugins.map(function (p) {
            _newArrowCheck(this, _this2);

            return p.dev();
          }.bind(this))).then(function ($await_4) {
            return $return();
          }.$asyncbind(this, $error), $error);
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }, {
    key: 'start',
    value: function start() {
      return new Promise(function ($return, $error) {
        var _this3, config;

        _this3 = this;

        config = (0, _loadConfig2.default)(this);
        return Promise.all(config.plugins.map(function (plugin) {
          _newArrowCheck(this, _this3);

          return plugin(this, false);
        }.bind(this))).then(function ($await_5) {
          this.plugins = $await_5;

          return Promise.all(this.plugins.map(function (p) {
            _newArrowCheck(this, _this3);

            return p.start();
          }.bind(this))).then(function ($await_6) {
            return $return();
          }.$asyncbind(this, $error), $error);
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }, {
    key: 'restart',
    value: function restart() {
      return new Promise(function ($return, $error) {
        var _this4;

        _this4 = this;
        return Promise.all(this.plugins.map(function (pluginController) {
          _newArrowCheck(this, _this4);

          return pluginController.end();
        }.bind(this))).then(function ($await_7) {
          return this.start().then(function ($await_8) {
            return $return();
          }.$asyncbind(this, $error), $error);
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }, {
    key: 'stop',
    value: function stop() {
      return new Promise(function ($return, $error) {
        var _this5;

        _this5 = this;
        return Promise.all(this.plugins.map(function (pluginController) {
          _newArrowCheck(this, _this5);

          return pluginController.end();
        }.bind(this))).then(function ($await_9) {
          return $return();
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }]);

  return Engine;
}();

exports.default = Engine;