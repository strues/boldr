import postsReducer from './post';

describe('Post Duck', () => {
  it('Should return the initial state', () => {
    expect(
        postsReducer(undefined, {}),
      ).toEqual({
        loading: false,
        error: null,
      });
  });
});
