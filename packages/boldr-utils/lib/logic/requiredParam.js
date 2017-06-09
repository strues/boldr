"use strict";

module.exports = function requiredParam(name) {
  throw new Error(`Missing paramater ${name}`);
};