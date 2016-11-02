import configureStore from './store';

describe('(Store) configureStore', () => {
  it('should have an empty asyncReducers object', () => {
    const store = configureStore();
    expect(store.asyncReducers).toEqual({});
  });
});
