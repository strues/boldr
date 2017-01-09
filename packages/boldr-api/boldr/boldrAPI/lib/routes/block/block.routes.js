'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _core = require('../../core');

var _utils = require('../../utils');

var _block = require('./block.controller');

var ctrl = _interopRequireWildcard(_block);

var _block2 = require('./block.model');

var _block3 = _interopRequireDefault(_block2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_block3.default);

var router = new _express2.default.Router();
/**
 * @api {get} /blocks       Get all blocks
 * @apiName listBlocks
 * @apiGroup Blocks
 * @apiPermission public
 * @apiSuccess {Object[]} blocks        List of blocks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listBlocks);

/**
 * @api {get} /blocks/:id       Get a specific by its id.
 * @apiName showBlocks
 * @apiGroup Blocks
 * @apiPermission public
 * @apiSuccess (Success 200) {Object} The requested block
 */
router.get('/:id', controller.show.bind(controller));
router.post('/', _authentication.isAuthenticated, ctrl.createBlock);
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

exports.default = router;