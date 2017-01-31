// test/styleMock.js

// Return an object to emulate css modules (if you are using them)
module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey(fileData, filename) {
    // The output is always the same.
    return 'cssTransform';
  },
};
