const cache = {};

export default class Storage {
  constructor(opts = {}) {
    Object.keys(Storage.defaults).map((key) => {
      this[key] = opts.hasOwnProperty(key) ? opts[key] : Storage.defaults[key];
    });
  }
}

Storage.defaults = {
  storage: typeof window !== 'undefined' ?
  window.localStorage : null, // localStorage, sessionStorage or custom conforming to storage API
};

Storage.create = (opts) => (new Storage(opts));

Storage.cache = cache;

Storage.prototype.cache = cache;

Storage.prototype.get = function(key) {
  try {
    return this.storage.getItem(key);
  } catch (e) {
    return this.cache[key];
  }
};

Storage.prototype.set = function(key, value) {
  try {
    this.storage.setItem(key, value);
    return value;
  } catch (e) {
    this.cache[key] = value;
    return value;
  }
};

Storage.prototype.remove = function(key) {
  try {
    this.storage.removeItem(key);
  } catch (e) {
    delete this.cache[key];
  }
};
