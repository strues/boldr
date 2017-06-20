import articlesReducer from './reducer';

describe('Post reducer', () => {
  it('Should return the initial state', () => {
    expect(articlesReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    });
  });
});
