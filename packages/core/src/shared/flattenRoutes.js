/**
 * @module boldr-core/shared/flattenRoutes
 */

import flatMapDeep from 'lodash/flatMapDeep';

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
