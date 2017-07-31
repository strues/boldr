import ApolloClient from 'apollo-client';

import createBoldrStore, { getMiddlewares } from './createBoldrStore';

describe('createBoldrStore', () => {
  it('shoud expose a function', () => {
    expect(typeof createBoldrStore).toBe('function');
  });
  it('should initialize the store', () => {
    const env = 'test';
    const initialState = {};
    const apolloClient = new ApolloClient();
    function reducer() {
      return {
        apollo: apolloClient.reducer(),
      };
    }
    const s = createBoldrStore(reducer, initialState, apolloClient, env);
    expect(typeof s.dispatch).toBe('function');
    expect(typeof s.subscribe).toBe('function');
    expect(typeof s.getState).toBe('function');
    expect(typeof s.replaceReducer).toBe('function');
    const state = s.getState();
    expect(typeof state.router).toBe('object');
    expect(typeof state.boldr.settings).toBe('object');
    expect(typeof state.app).toBe('object');
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
