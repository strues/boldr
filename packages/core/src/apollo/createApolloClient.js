/* eslint-disable no-unused-vars, eqeqeq */

/**
 * @module boldr-core/apollo/createApolloClient
 */
import { ApolloClient } from 'react-apollo';
import { createNetworkInterface } from './networkInterface';
import { createBatchingNetworkInterface } from './batchNetworkInterface';

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

  const hasApollo = apolloUri !== null;
  const ssrMode = !process.browser;
  let client;
  if (hasApollo) {
    const opts = {
      /* istanbul ignore next */
      dataIdFromObject: result => {
        /* istanbul ignore next */
        if (result.id && result.__typename) {
          /* istanbul ignore next */
          return result.__typename + result.id;
        }
        /* istanbul ignore next */
        return null;
      },
      credentials: trustNetwork ? 'include' : 'same-origin',
      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
      headers,
    };
    if (!ssrMode) {
      /* istanbul ignore next */
      opts.ssrForceFetchDelay = 100;
      /* istanbul ignore next */
      opts.connectToDevTools = true;
    }
    let networkInterface;

    if (batchRequests) {
      /* istanbul ignore next */
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
    /* istanbul ignore next */
    client = new ApolloClient({
      ssrMode,
      queryDeduplication,
    });
  }

  return client;
}
