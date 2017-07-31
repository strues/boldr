const httpMethods = ['get', 'post', 'put', 'head', 'delete', 'options'];
function wrapRouter(router) {
  httpMethods.concat(['use', 'all', 'param']).forEach(method => {
    if (typeof router[method] === 'function') {
      const originMethod = `__${method}`;
      router[originMethod] = router[method].bind(router);
      // eslint-disable-next-line
      router[method] = function(...handlers) {
        router[originMethod](...handlers.map(fn => wrapAsyncHandler(fn, method !== 'param')));
        return router;
      };
    }
  });

  if (typeof router.route === 'function') {
    router.__route = router.route.bind(router);
    // eslint-disable-next-line
    router.route = function(...args) {
      return wrapRouter(router.__route(...args));
    };
  }
  return router;
}

function wrapAsyncHandler(fn, withErrorParam = true) {
  if (typeof fn !== 'function') {
    return fn;
  }
  if (withErrorParam && fn.length > 3) {
    // error handler
    // eslint-disable-next-line
    return function(err, req, res, next) {
      // eslint-disable-next-line
      return callAndCatchPromiseError(fn, ...toArray(arguments));
    };
  }
  // eslint-disable-next-line
  return function(req, res, next) {
    // eslint-disable-next-line
    return callAndCatchPromiseError(fn, ...toArray(arguments));
  };
}

function callAndCatchPromiseError(fn, ...args) {
  const next = args[args.length - 1];
  let p = null;
  try {
    p = fn.apply(null, args);
  } catch (err) {
    return next(err);
  }
  if (p && p.then && p.catch) {
    p.catch(err => next(err));
  }
}

function toArray(args) {
  return Array.prototype.slice.call(args);
}

export { wrapRouter };
