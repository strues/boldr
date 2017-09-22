/* eslint-disable no-implicit-coercion */
// Borrowed from https://github.com/react-bootstrap/dom-helpers/blob/master/src/util/inDOM.js

module.exports = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
