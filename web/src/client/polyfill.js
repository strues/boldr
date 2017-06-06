/* eslint-disable */
/* istanbul-ignore-next */
require('babel-runtime/core-js/promise').default = require('bluebird');
/* istanbul-ignore-next */
if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    function() {
      /* istanbul-ignore-next */
      return {
        matches: false,
        addListener() {},
        removeListener() {},
      };
    };
}
/* istanbul-ignore-next */
export default function ready(cb) {
  /* istanbul-ignore-next */
  if (typeof cb === 'function') {
    cb();
  }
}
