import createApolloClient from '../apollo/createApolloClient';
import createBoldrStore, { getMiddlewares } from './createBoldrStore';

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
      apolloUri: '/api/v1/graphql',
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

describe('getMiddlewares', () => {
  it('should return array of middleware', () => {
    const middlewares = getMiddlewares();
    expect(Array.isArray(middlewares)).toBe(true);
  });
  it('should support first attr as function', () => {
    const fn = jest.fn();
    const middlewares = getMiddlewares(fn);
    expect(middlewares).toContain(fn);
  });
  it('should support first attr as array', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const middlewares = getMiddlewares([fn1, fn2]);
    expect(middlewares).toContain(fn1);
    expect(middlewares).toContain(fn2);
  });
});
