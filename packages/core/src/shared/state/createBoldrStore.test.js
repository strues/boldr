import createApolloClient from '../apollo/createApolloClient';
import createBoldrStore from './createBoldrStore';

describe('createBoldrStore', () => {
  it('shoud expose a function', () => {
    expect(typeof createBoldrStore).toBe('function');
  });
  it('should initialize the store', () => {
    const initialState = {};
    const apolloClient = createApolloClient({
      initialState: {},
      batchRequests: false,
      trustNetwork: true,
      queryDeduplication: true,
      uri: '/api/v1/graphql',
      connectToDevTools: true,
      ssrForceFetchDelay: 100,
    });

    const appReducer = { app: {} };
    const history = {};
    const s = createBoldrStore(history, appReducer, initialState, apolloClient);
    expect(typeof s.dispatch).toBe('function');
    expect(typeof s.subscribe).toBe('function');
    expect(typeof s.getState).toBe('function');
    expect(typeof s.replaceReducer).toBe('function');
  });
});
