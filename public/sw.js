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

var precacheConfig = [["/","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-192x192.png","d41d8cd98f00b204e9800998ecf8427e"],["/android-chrome-256x256.png","d41d8cd98f00b204e9800998ecf8427e"],["/apple-touch-icon.png","d41d8cd98f00b204e9800998ecf8427e"],["/browserconfig.xml","d41d8cd98f00b204e9800998ecf8427e"],["/client/0-c94d74da2ba17f7515e5.js","b6f22f9b665c12a7dc9c8e1846644fe5"],["/client/1-fc3b3a739f33b0b10c31.js","6c77161ebe0738b1c284c46a7472bf6b"],["/client/10-05cb8ae1b0e5548e59d1.js","980144cc58dba9597076cd351376704a"],["/client/11-24af53ad16e24ca2609d.js","8321fbd7d500cbc2542b9bf16d5683bf"],["/client/12-f03533544a463e787790.js","6becf835409cd9a289ec8692e1049dd3"],["/client/13-abf926f42fa19d4fd2d4.js","a6f7e251edb077102f114e9ebcf3faa6"],["/client/14-5ae10e296a0b35ae4ad2.js","8107e17815f4b1af84543489c0a5e265"],["/client/15-8696ed290ff6c4e30dc4.js","a36cdba366cbc1b94ad9c343de30e3dd"],["/client/16-f768b099237ec7cce1e4.js","3ef0f97f1670e6a4cb31d9582d83d378"],["/client/17-dc5d397ef339fd5aff81.js","a6242b36a8dd04b5bc157b6226762fd3"],["/client/18-2d4556bf5db6855eb58c.js","80af8d38df5fac545b4d61df1cb96798"],["/client/19-b441afe14c67fb0d2f59.js","9e1cfa7672de5208716d564ada519768"],["/client/2-180efbb6ffb579965328.js","366e0ca0a7296f800ede53b4ef153c94"],["/client/20-45862dc951d0661e4c13.js","f0857c87425b973300b72b422fefdaa4"],["/client/21-312adecf278b5da77782.js","4d5b6ae022b4dfb600884c39dc2054d8"],["/client/22-7961f2a7f97642a0d87e.js","dba9b2464df47d7297018631ad8c32b5"],["/client/23-9ba2da261ddeada106fd.js","5deb1ee2a7dbaf3c2a4e56648437e910"],["/client/24-ac0a94d832eea332a142.js","77d449b010e51a7fa9c3ec4113ae8662"],["/client/25-aaa0c14806cd569d31c6.js","ba95d117fe2996f0e894404e421dba31"],["/client/3-6626bcda8b61c97c8694.js","e6fd0c68b0c2e849119cc70d179b9d2f"],["/client/4-82c5563e3981f11d9187.js","a2d802f18f654246b3acd21eff7b3768"],["/client/5-d9a06284c237eebc029d.js","3d3f632ee257767cdd42343d820ca33d"],["/client/6-57adec63ce3d474bcfa8.js","d71321e7878893ea35ed44607ef0d9df"],["/client/7-372502efa2edb123f6ce.js","797c2a842fb2310196c21dd29b070554"],["/client/8-cb9a79a6778992c09529.js","dc6449705b84a4ae595199a47836fe43"],["/client/9-d216c81b6249ddc9d438.js","d82045f980b0f97570f297fbfcd5084c"],["/client/file-2clfMgrT.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/client/file-4mR0TqGl.eot","25a32416abee198dd821b0b17a198a8f"],["/client/file-5dqT1T52.ttf","1dc35d25e61d819a9c357074014867ab"],["/client/file-6A2ILkjl.svg","d7c639084f684d66a1bc66855d193ed8"],["/client/file-mfH2KMYF.woff2","e6cf7c6ec7c2d6f670ae9d762604cb0b"],["/client/index-183aad6d4b41eef96c18.css","69d89ef7d804c14b5d49b17114960e15"],["/client/index-183aad6d4b41eef96c18.css.map","df04e7e12b08aa4273d51d25d3d48f9f"],["/client/index-183aad6d4b41eef96c18.js","675fa395542e70f4621f413e2b4b6bd3"],["/favicon-16x16.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon-32x32.png","d41d8cd98f00b204e9800998ecf8427e"],["/favicon.ico","d41d8cd98f00b204e9800998ecf8427e"],["/manifest.json","d41d8cd98f00b204e9800998ecf8427e"],["/mstile-150x150.png","d41d8cd98f00b204e9800998ecf8427e"],["/safari-pinned-tab.svg","d41d8cd98f00b204e9800998ecf8427e"],["/sw.js","d41d8cd98f00b204e9800998ecf8427e"],["https://cdn.polyfill.io/v2/polyfill.min.js","d41d8cd98f00b204e9800998ecf8427e"]];
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







