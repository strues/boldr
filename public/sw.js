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

var precacheConfig = [["/","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-192x192.png","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-256x256.png","d41d8cd98f00b204e9800998ecf8427e"],["/apidoc","d41d8cd98f00b204e9800998ecf8427e"],["/apple-touch-icon.png","d41d8cd98f00b204e9800998ecf8427e"],["/browserconfig.xml","d41d8cd98f00b204e9800998ecf8427e"],["/client/0-537f4c0de60d2690716b.js","5c4ec31005535ee2b17a8903a60dc2ba"],["/client/1-1d467fd675c207ee6e20.js","c0dbf3c5b05de4171a03a52a7085ace0"],["/client/10-f10001792c93f5ff0a65.js","ec8aead33ab2e5f02aefaf12991fffe1"],["/client/11-ae1eb0445835f3b55d1c.js","0e40151030c93375a471f8d2f840730f"],["/client/12-29db1997a73e23daeb62.js","8c86f6bccd9f818908d0580831a3d9c2"],["/client/13-279481ad6cacecef59e6.js","a7ed6525de34c8fd84108a730386e1da"],["/client/14-51744d3a3a82fadfd9df.js","58f89cba6520295ddc170768decc3a01"],["/client/15-117d77e7c776ccd88a5d.js","3b71f3cab387ad74590ee7e45ebd24b3"],["/client/16-94acce85f6b02ebfa96d.js","2115e37aec4001816ff3fa1bb90d94e5"],["/client/17-5b3c782e5a6748aa7caa.js","9491a6145eaf40d628d62798be92e49f"],["/client/18-2d4556bf5db6855eb58c.js","6166153508d4b42887d6119f3e8f346f"],["/client/19-71baa51e48d94a59930f.js","63144cfe25a5e860209340a64cd0ec1b"],["/client/2-73f026023038af60ba92.js","4b0e8a66150a74df4e84094e4e17d8d4"],["/client/20-eb39d7ad0c7f25ad9529.js","340a8ec69a1d3cf67bc200fa22c94cdf"],["/client/21-4de23c4c591525a72714.js","4f902ffe6677437cff741a5678c3239a"],["/client/22-539199eca4ceaf01e1b1.js","068f3827366769d194051eb54b3ce245"],["/client/23-42fea83a005aae7af902.js","312ee98b4ce1b044bd6bc50f1ea71f3f"],["/client/24-557d35616282dda174b2.js","f02b6a43a92e67d510309d2ead329c9f"],["/client/3-9f5d3a77189a47d48744.js","bc5c22f628ad0181ce0ae36145aa8f2f"],["/client/4-3212d999348b072354e1.js","acab4ca88a706449caac0fb43204a082"],["/client/5-f907dd84ba0ab711ee1a.js","f21c45cff1f6f63fe6299a5d1b0d78e2"],["/client/6-6f14a0a0d8f006446ef7.js","8b0c03eb22a98e9e6b6ccc39ee3368f0"],["/client/7-453c18e061bb656ee696.js","1507e89c5ceb0cfa112df54dcd42efe1"],["/client/8-f7ef67ba96d7c3d54e56.js","5ed8dc4f2f6b1493da25e6b418944d11"],["/client/9-239f3f4191d0c4e49b98.js","21610a16b5b42cc698788f58a26cfb76"],["/client/file-2clfMgrT.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/client/file-4mR0TqGl.eot","25a32416abee198dd821b0b17a198a8f"],["/client/file-5dqT1T52.ttf","1dc35d25e61d819a9c357074014867ab"],["/client/file-6A2ILkjl.svg","d7c639084f684d66a1bc66855d193ed8"],["/client/file-mfH2KMYF.woff2","e6cf7c6ec7c2d6f670ae9d762604cb0b"],["/client/index-d06bfe63f290a3eed990.css","60e9570b8f8a389122d197791140561a"],["/client/index-d06bfe63f290a3eed990.css.map","bf553d8fe911130aa7a2c3bb90942baa"],["/client/index-d06bfe63f290a3eed990.js","293bec79fda6a07728c631c43b4074c2"],["/favicon-16x16.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon-32x32.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon.ico","d41d8cd98f00b204e9800998ecf8427e"],["/manifest.json","d41d8cd98f00b204e9800998ecf8427e"],["/mstile-150x150.png","d41d8cd98f00b204e9800998ecf8427e"],["/safari-pinned-tab.svg","d41d8cd98f00b204e9800998ecf8427e"],["/sw.js","d41d8cd98f00b204e9800998ecf8427e"],["https://cdn.polyfill.io/v2/polyfill.min.js","d41d8cd98f00b204e9800998ecf8427e"]];
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







