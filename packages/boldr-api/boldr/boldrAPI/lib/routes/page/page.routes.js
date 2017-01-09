'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _index = require('../../core/index');

var _utils = require('../../utils');

var _page = require('./page.model');

var _page2 = _interopRequireDefault(_page);

var _page3 = require('./page.controller');

var ctrl = _interopRequireWildcard(_page3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _index.BaseController(_page2.default);

var router = new _express2.default.Router();
/**
 * @api {get} /pages       Get all pages
 * @apiName listPages
 * @apiGroup Pages
 * @apiPermission public
 * @apiSuccess {Object[]} roles List of pages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listPages);
router.get('/:url', ctrl.getPageByUrl);
router.post('/', _authentication.isAuthenticated, ctrl.createPage);
router.put('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.patch('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.delete('/:id', _authentication.isAuthenticated, controller.destroy.bind(controller));

exports.default = router;