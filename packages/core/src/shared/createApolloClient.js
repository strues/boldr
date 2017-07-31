/* eslint-disable no-unused-vars, eqeqeq */

/**
 * @module boldr-core/shared/createApolloClient
 */
import { ApolloClient } from 'react-apollo';
import { createNetworkInterface } from '../util/networkInterface';
import { createBatchingNetworkInterface } from '../util/batchNetworkInterface';

/**
 * Bootstrap an ApolloClient
 * @param  {Object} [config={}] configuration values for the ApolloClient
 * @return {function}           function to create the client.
 */
export default function createApolloClient(config = {}) {
  const {
    headers,
    initialState = {},
    batchRequests = false,
    trustNetwork = true,
    queryDeduplication = true,
    apolloUri,
    connectToDevTools = true,
    ssrForceFetchDelay = 100,
  } = config;

  const hasApollo = apolloUri != null;
  const ssrMode = !process.browser;
  let client;
  if (hasApollo) {
    const opts = {
      dataIdFromObject: result => {
        if (result.id && result.__typename) {
          // eslint-disable-line no-underscore-dangle
          return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
        }
        return null;
      },
      credentials: trustNetwork ? 'include' : 'same-origin',
      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
      headers,
    };
    if (!ssrMode) {
      opts.ssrForceFetchDelay = 100;
      opts.connectToDevTools = true;
    }
    let networkInterface;

    if (batchRequests) {
      networkInterface = createBatchingNetworkInterface({
        uri: apolloUri,
        batchInterval: 10,
        opts,
      });
    } else {
      networkInterface = createNetworkInterface({
        uri: apolloUri,
        opts,
      });
    }

    client = new ApolloClient({
      ssrMode,
      queryDeduplication,
      networkInterface,
    });
  } else {
    client = new ApolloClient({
      ssrMode,
      queryDeduplication,
    });
  }

  return client;
}
