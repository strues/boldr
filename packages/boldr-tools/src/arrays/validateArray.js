module.exports = function validateArray(arr, errorMessage) {
  if (!Array.isArray(arr)) {
    console.error('Invalid array');
    throw new Error('Expected a valid array');
  }
};
