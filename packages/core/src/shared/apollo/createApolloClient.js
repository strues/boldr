// @flow
/* eslint-disable no-unused-vars, eqeqeq */

/**
 * @module boldr-core/apollo/createApolloClient
 */
import { ApolloClient } from 'react-apollo';
import { createNetworkInterface } from './networkInterface';
import { createBatchingNetworkInterface } from './batchNetworkInterface';

export type ApolloClientConfig = {
  headers?: Object,
  initialState?: Object,
  batchRequests?: boolean,
  trustNetwork?: boolean,
  queryDeduplication?: boolean,
  uri?: string,
  connectToDevTools?: boolean,
  ssrForceFetchDelay?: number,
};
/**
 * Bootstrap an ApolloClient
 * @param  {Object} [config={}] configuration values for the ApolloClient
 * @return {function}           function to create the client.
 */
export default function createApolloClient(config: ApolloClientConfig = {}) {
  const {
    headers,
    initialState = {},
    batchRequests = false,
    trustNetwork = true,
    queryDeduplication = true,
    uri,
    connectToDevTools = true,
    ssrForceFetchDelay = 100,
  } = config;

  const hasApollo = uri !== null;
  // $FlowIssue
  const ssrMode = !process.browser;
  let client;
  if (hasApollo) {
    const opts = {
      /* istanbul ignore next */
      dataIdFromObject: ({ __typename, id, slug, safeName }) =>
        `${__typename}:${slug || id || safeName}`,
      credentials: trustNetwork ? 'include' : 'same-origin',
      headers,
    };
    if (!ssrMode) {
      /* $FlowIssue istanbul ignore next */
      opts.ssrForceFetchDelay = 100;
      /* $FlowIssue istanbul ignore next */
      opts.connectToDevTools = true;
    }

    let networkInterface;

    if (batchRequests) {
      /* istanbul ignore next */
      networkInterface = createBatchingNetworkInterface({
        uri,
        batchInterval: 10,
        opts,
      });
    } else {
      networkInterface = createNetworkInterface({
        uri,
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
