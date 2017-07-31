const tap = value => fn => (typeof fn === 'function' && fn(value), console.log(value));

module.exports = tap;
