// Polyfill for fetch() API in NodeJS based on code from
// https://github.com/matthew-andrews/isomorphic-fetch/blob/master/fetch-npm-node.js
if (!global.fetch) {
  const realFetch = require('node-fetch');
  global.fetch = function fetch(url, options) {
    const normalized = /^\/\//.test(url) ? `https:${url}` : url;
    return realFetch.call(this, normalized, options);
  };
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}

export * from './common';

export * from './util/debug';