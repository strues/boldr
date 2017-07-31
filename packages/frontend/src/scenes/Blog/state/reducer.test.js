import reducer from './reducer';

describe('Blog reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentArticle: {},
      currentTag: {},
    });
  });
});
