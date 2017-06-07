module.exports = function throttle(duration, fn) {
  let throttler = null;
  return (...args) => {
    if (throttler) {
      clearTimeout(throttler);
    }
    throttler = setTimeout(() => fn(...args), duration);
  };
};
