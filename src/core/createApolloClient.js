import ApolloClient from 'apollo-client';

const createApolloClient = networkInterface => {
  const params = {
    dataIdFromObject: o => o.id,
    networkInterface,
  };
  if (__CLIENT__ && typeof window !== 'undefined') {
    if (window.__APOLLO_STATE__) {
      params.initialState = window.__APOLLO_STATE__;
    }
    params.ssrForceFetchDelay = 200;
  } else {
    params.ssrMode = true;
  }

  return new ApolloClient(params);
};

export default createApolloClient;
