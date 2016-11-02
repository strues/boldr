import _ from 'lodash';
// Wrap each express route method with code that passes unhandled exceptions
// from async functions to the `next` callback. This way we don't need to
// wrap our route handlers in try-catch blocks.
function monkeyPatchRouteMethods(app) {
  ['get', 'put', 'post', 'delete', 'patch'].forEach((routeMethodName) => {
    const originalRouteMethod = app[routeMethodName];

    app[routeMethodName] = function() {
      const args = _.toArray(...args);
      const originalRouteHandler = _.last(args);

      if (_.isFunction(originalRouteHandler)) {
        // Overwrite the route handler.
        args[args.length - 1] = function(req, res, next) {
          const ret = originalRouteHandler.call(this, req, res, next);

          // If the route handler returns a Promise (probably an async function) catch
          // the error and pass it to the next middleware.
          if (_.isObject(ret) && _.isFunction(ret.then) && _.isFunction(ret.catch)) {
            return ret.catch(next);
          } else {
            return ret;
          }
        };
      }

      return originalRouteMethod.apply(this, args);
    };
  });
}

export default monkeyPatchRouteMethods;
