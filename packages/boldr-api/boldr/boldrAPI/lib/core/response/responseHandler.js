"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function responseHandler(res, status, data) {
  return res.status(status || 200).json(data);
}

exports.default = responseHandler;