import ApolloClient from 'apollo-client';
import { createBatchingNetworkInterface } from 'apollo-upload-client';
import { getToken } from './authentication/token';

const createApolloClient = networkInterface => {
  const params = {
    dataIdFromObject: result => {
      if (result.id && result.__typename) {
        // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },

    networkInterface,
    queryDeduplication: true,
  };
  if (process.browser) {
    if (window.__APOLLO_STATE__) {
      params.initialState = window.__APOLLO_STATE__;
    }
    params.ssrForceFetchDelay = 100;
    params.connectToDevTools = true;
  } else {
    params.ssrMode = true;
  }

  return new ApolloClient(params);
};

// Load the JWT if it exists.
// Get token will return null if it does not exist
const token = getToken();

// Apollo network interface
const networkInterface = createBatchingNetworkInterface({
  uri: process.env.GRAPHQL_ENDPOINT,
  batchInterval: 10,
});

networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      // If headers don't exist for some reason create them.
      if (!req.options.headers) {
        req.options.headers = {};
      }
      if (!process.browser) {
        req.options.headers.credentials = 'same-origin';
        req.options.headers.credentials = req.headers;
      }
      // Add our auth token to the headers
      // Authorization: 'Bearer Token'
      if (process.browser && token) {
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    },
  },
]);

const apolloClient = createApolloClient(networkInterface);

export default apolloClient;
