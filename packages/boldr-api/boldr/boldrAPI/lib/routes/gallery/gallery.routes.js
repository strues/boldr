'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _base = require('../../core/base');

var _index = require('../../utils/index');

var _gallery = require('./gallery.model');

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _base.BaseController(_gallery2.default);

// Model


var router = new _express2.default.Router();

router.get('/', _index.processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', _authentication.isAuthenticated, controller.create.bind(controller));
router.put('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.patch('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.delete('/:id', _authentication.isAuthenticated, controller.destroy.bind(controller));

exports.default = router;