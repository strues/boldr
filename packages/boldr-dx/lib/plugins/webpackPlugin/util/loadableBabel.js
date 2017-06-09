'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var _this = this;

  var t = _ref.types,
      template = _ref.template;

  var WEBPACK_REQUIRE_PROP = 'webpackRequireWeakId';
  var WEBPACK_CHUNK_NAME_PROP = 'webpackChunkName';
  var WEBPACK_CHUNK_NAME_PATTERN = /webpackChunkName:\s*"([^"]+)"/;
  var SERVER_PROP = 'serverSideRequirePath';

  var webpackRequireTemplate = template('() => require.resolveWeak(MODULE)');
  var serverTemplate = template('PATH.join(__dirname, MODULE)');

  var getWebpackChunkName = function (comments) {
    _newArrowCheck(this, _this);

    if (comments) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = comments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var comment = _step.value;

          var matches = WEBPACK_CHUNK_NAME_PATTERN.exec(comment.value);

          if (matches) {
            return matches[1];
          }
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
    }
  }.bind(this);

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        var _this2 = this;

        var opts = _extends({
          server: true,
          webpack: false
        }, this.opts);

        if (!opts.server && !opts.webpack) return;

        var source = path.node.source.value;
        if (source !== 'react-loadable') return;

        var defaultSpecifier = path.get('specifiers').find(function (specifier) {
          _newArrowCheck(this, _this2);

          return specifier.isImportDefaultSpecifier();
        }.bind(this));

        if (!defaultSpecifier) return;

        var bindingName = defaultSpecifier.node.local.name;
        var binding = path.scope.getBinding(bindingName);

        binding.referencePaths.forEach(function (refPath) {
          _newArrowCheck(this, _this2);

          var callExpression = refPath.parentPath;
          if (!callExpression.isCallExpression()) return;

          var args = callExpression.get('arguments');
          if (args.length !== 1) throw callExpression.error;

          var options = args[0];
          if (!options.isObjectExpression()) return;

          var properties = options.get('properties');
          var propertiesMap = {};

          properties.forEach(function (property) {
            _newArrowCheck(this, _this2);

            var key = property.get('key');
            propertiesMap[key.node.name] = property;
          }.bind(this));

          if ((!opts.webpack || properties[WEBPACK_REQUIRE_PROP]) && (!opts.server || properties[SERVER_PROP])) {
            return;
          }

          var loaderMethod = propertiesMap.loader.get('value');
          var dynamicImport = void 0;

          loaderMethod.traverse({
            Import: function Import(path) {
              dynamicImport = path.parentPath;
              path.stop();
            }
          });

          if (!dynamicImport) return;

          var importedModule = dynamicImport.get('arguments')[0];

          if (opts.webpack) {
            if (!propertiesMap[WEBPACK_REQUIRE_PROP]) {
              var webpackRequire = webpackRequireTemplate({
                MODULE: importedModule.node
              }).expression;

              propertiesMap.loader.insertAfter(t.objectProperty(t.identifier(WEBPACK_REQUIRE_PROP), webpackRequire));
            }

            if (!propertiesMap[WEBPACK_CHUNK_NAME_PROP]) {
              var webpackChunkName = getWebpackChunkName(importedModule.node.leadingComments) || getWebpackChunkName(importedModule.node.trailingComments);

              if (webpackChunkName) {
                propertiesMap.loader.insertAfter(t.objectProperty(t.identifier(WEBPACK_CHUNK_NAME_PROP), t.stringLiteral(webpackChunkName)));
              }
            }
          }

          if (opts.server && !propertiesMap[SERVER_PROP]) {
            var server = serverTemplate({
              PATH: this.addImport('path', 'default', 'path'),
              MODULE: importedModule.node
            }).expression;

            propertiesMap.loader.insertAfter(t.objectProperty(t.identifier(SERVER_PROP), server));
          }
        }.bind(this));
      }
    }
  };
};

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }