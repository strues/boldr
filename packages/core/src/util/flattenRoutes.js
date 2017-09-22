/**
 * @module @boldr/core/util/flattenRoutes
 */

import flatMapDeep from 'lodash.flatmapdeep';

/**
 * Takes a collection of nested routes and returns a flattened object
 * @param  {Object} topRoutes the parent routes
 * @return {Object}           flattened routes
 */
const flattenRoutes = topRoutes =>
  flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
    other,
    ...flattenRoutes(nestedRoutes),
  ]);

export default flattenRoutes;
