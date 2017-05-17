// React propTypes
import PropTypes from 'prop-types';
// Apollo client library
import { createNetworkInterface, ApolloClient } from 'react-apollo';
import { getToken } from './authentication/token';

// ----------------------
const token = getToken();
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/api/v1/graphql',
  opts: {
    credentials: 'include',
  },
});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      if (!!token) {
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    },
  },
]);
// Helper function to create a new Apollo client, by merging in
// passed options alongside the defaults
function createClient(opt = {}) {
  return new ApolloClient(
    Object.assign(
      {
        reduxRootSelector: state => state.apollo,
        networkInterface,
      },
      opt,
    ),
  );
}

// Helper function that will merge a passed object with the expected
// React propTypes 'shape', for use with the `react-apollo` `graphql` HOC
export function mergeData(toMerge) {
  return PropTypes.shape(
    Object.assign(
      {
        loading: PropTypes.bool.isRequired,
      },
      toMerge,
    ),
  );
}

// Creates a new browser client
export function browserClient() {
  return createClient();
}

// Creates a new server-side client
export function serverClient() {
  return createClient({
    ssrMode: true,
  });
}
