/* eslint-disable func-names */
const randomKey = keyLength => {
  return Math.random().toString(36).substr(2, keyLength);
};

const createDefaultMatch = () => ({ path: '/',
  url: '/',
  isExact: true,
  params: {} });

const createDefaultLocation = () => ({ pathname: '/',
  search: '',
  hash: '',
  key: randomKey(6) });

const createDefaultHistory = location => ({
  action: 'POP',
  location: location || createDefaultLocation(),
  _listeners: [],
  listen: function(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(func => func !== fn);
    };
  },
  push: function(location) {
    this._notifyListeners(location);
  },
  replace: function(location) {
    this._notifyListeners(location);
  },
  _notifyListeners: function(loc) {
    this._listeners.forEach(fn => {
      fn(loc);
    });
  },
  createHref: loc => {
    if (typeof loc === 'string') {
      return loc;
    } else {
      return loc.pathname + (loc.search || '') + (loc.hash || '');
    }
  },
});

const createRouterContext = (options = {}) => {
  const {
    history: userHistory,
    location: userLocation,
    match: userMatch,
    staticContext,
  } = options;

  const match = {
    ...createDefaultMatch(),
    ...userMatch,
  };

  const location = {
    ...createDefaultLocation(),
    ...userLocation,
  };

  const history = {
    ...createDefaultHistory(location),
    ...userHistory,
  };

  return {
    router: {
      history,
      route: {
        match,
        location,
      },
      staticContext,
    },
  };
};

export default createRouterContext;
