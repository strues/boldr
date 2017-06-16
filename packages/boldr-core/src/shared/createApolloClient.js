import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface } from 'react-apollo';

export default function createApolloClient(config = {}) {
  const {
    headers,
    initialState = {},
    batchRequests = false,
    trustNetwork = true,
    queryDeduplication = true,
  } = config;
  const apolloUri = initialState.ssr && initialState.ssr.apolloUri;

  const hasApollo = apolloUri != null;
  const ssrMode = process.env.TARGET === 'node';
  let client;

  if (hasApollo) {
    const opts = {
      credentials: trustNetwork ? 'include' : 'same-origin',

      // transfer request headers to networkInterface so that they're accessible to proxy server
      // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
      headers,
    };

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
