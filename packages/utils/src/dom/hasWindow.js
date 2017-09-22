const hasWindow = typeof window === 'object' && window !== null && window.self === window;

module.exports = hasWindow;
