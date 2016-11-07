import navReducer from './nav';

describe('Nav Duck', () => {
  it('Should return the initial state', () => {
    expect(
        navReducer(undefined, {}),
      ).toEqual({
        byLabel: {
          loaded: false,
        },
        labels: [],
      });
  });
});
