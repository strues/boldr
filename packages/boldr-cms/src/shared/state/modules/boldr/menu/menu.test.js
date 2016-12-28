import menuReducer from './menu';

describe('Menu Duck', () => {
  it('Should return the initial state', () => {
    expect(
        menuReducer(undefined, {}),
      ).toEqual({
        byLabel: {
        },
        labels: [],
      });
  });
});
