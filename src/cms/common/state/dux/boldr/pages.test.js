import pagesReducer from './pages';

describe('Pages Duck', () => {
  it('Should return the initial state', () => {
    expect(
        pagesReducer(undefined, {})
      ).toEqual({
        loaded: false,
        all: {},
        ids: [],
        meta: {},
        filter: {}
      });
  });
});
