/**
 * Gives the dimensions of the browsers viewport
 * @see http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
 * @return {object} returns an object containing the height and width.
 */
module.exports = function getViewportSize() {
  const doc = document.documentElement;
  return {
    width: Math.max(doc.clientWidth, window.innerWidth || 0),
    height: Math.max(doc.clientHeight, window.innerHeight || 0),
  };
};
