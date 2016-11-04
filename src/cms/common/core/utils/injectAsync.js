import createReducer from '../../state/reducers';

export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}
export function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
  };
}
