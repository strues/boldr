import flatMapDeep from 'lodash/flatMapDeep';

const flattenRoutes = topRoutes =>
  flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
    other,
    ...flattenRoutes(nestedRoutes),
  ]);

export default flattenRoutes;
