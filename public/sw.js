/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-192x192.png","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-256x256.png","d41d8cd98f00b204e9800998ecf8427e"],["/apidoc","d41d8cd98f00b204e9800998ecf8427e"],["/apple-touch-icon.png","d41d8cd98f00b204e9800998ecf8427e"],["/browserconfig.xml","d41d8cd98f00b204e9800998ecf8427e"],["/client/0-537f4c0de60d2690716b.js","b0f3c3cdfbf7de127c3163eb748ab779"],["/client/1-1d467fd675c207ee6e20.js","ad606bc709864ab2b01e337b79b7031d"],["/client/10-f10001792c93f5ff0a65.js","5c401b92a253ce39afc75bbf287b8c2d"],["/client/11-ae1eb0445835f3b55d1c.js","f29ee968eb2cd92b850807fe2a46943c"],["/client/12-29db1997a73e23daeb62.js","5a834e82114ae2a736e0495a3166047e"],["/client/13-279481ad6cacecef59e6.js","70d2a804d73afa0035b45d125d2cbb26"],["/client/14-51744d3a3a82fadfd9df.js","8312dd378f290a055daac3684c70f2e7"],["/client/15-117d77e7c776ccd88a5d.js","99f695d381f4c3bda58ebb8f90fba7cd"],["/client/16-94acce85f6b02ebfa96d.js","0eb5d64a823854f8d768917512fae6e3"],["/client/17-5b3c782e5a6748aa7caa.js","1c6bd8502a757cd9e2e16c719f3f0568"],["/client/18-2d4556bf5db6855eb58c.js","d39efb957db734c3b2afebad8b961086"],["/client/19-71baa51e48d94a59930f.js","e6d30b7cc8ee482f38f3e9eaaf298e79"],["/client/2-73f026023038af60ba92.js","7afb970bcd4e3c4af69fc1f787dd75bc"],["/client/20-eb39d7ad0c7f25ad9529.js","105138107f5492ca4578c6553ad1f151"],["/client/21-4de23c4c591525a72714.js","0c414eb6e9eabedcb942b6024a044b99"],["/client/22-539199eca4ceaf01e1b1.js","a7b07d9b800671e9a992c4c6056c89c8"],["/client/23-54c3287bd9145fe1d852.js","f3c86717cc4dd92c48b25ec7fc7cc135"],["/client/24-557d35616282dda174b2.js","0256f747b52b47880a3983ee102ccb4a"],["/client/3-9f5d3a77189a47d48744.js","f4821e4af244a3e6b9f000ce2c854d5a"],["/client/4-3212d999348b072354e1.js","b410599626b61db753c04fa02bf93725"],["/client/5-f907dd84ba0ab711ee1a.js","91d3e364c888cf6387fa2cfd9ce72a87"],["/client/6-d966ec24af8eea3718aa.js","cd613b044adf200677a963b1f03d11ab"],["/client/7-453c18e061bb656ee696.js","cddcb7682a41e0770aafb2195299c605"],["/client/8-f7ef67ba96d7c3d54e56.js","cb6ce41002139a3e74de8a643e7b3a9e"],["/client/9-239f3f4191d0c4e49b98.js","25f86745c87ecc2a94663df2917fe78a"],["/client/file-2clfMgrT.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/client/file-4mR0TqGl.eot","25a32416abee198dd821b0b17a198a8f"],["/client/file-5dqT1T52.ttf","1dc35d25e61d819a9c357074014867ab"],["/client/file-6A2ILkjl.svg","d7c639084f684d66a1bc66855d193ed8"],["/client/file-mfH2KMYF.woff2","e6cf7c6ec7c2d6f670ae9d762604cb0b"],["/client/index-3f2d560ac30ed3c9ff61.css","60e9570b8f8a389122d197791140561a"],["/client/index-3f2d560ac30ed3c9ff61.css.map","5db053b5741ae11514ea830ae5350a6d"],["/client/index-3f2d560ac30ed3c9ff61.js","1d04ca5519f7194a38e81ffac592731f"],["/favicon-16x16.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon-32x32.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon.ico","d41d8cd98f00b204e9800998ecf8427e"],["/manifest.json","d41d8cd98f00b204e9800998ecf8427e"],["/mstile-150x150.png","d41d8cd98f00b204e9800998ecf8427e"],["/safari-pinned-tab.svg","d41d8cd98f00b204e9800998ecf8427e"],["/sw.js","d41d8cd98f00b204e9800998ecf8427e"],["https://cdn.polyfill.io/v2/polyfill.min.js","d41d8cd98f00b204e9800998ecf8427e"]];
var cacheName = 'sw-precache-v2-boldr-sw-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







