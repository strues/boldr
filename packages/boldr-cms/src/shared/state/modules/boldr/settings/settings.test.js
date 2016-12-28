import settingsReducer from './settings';

describe('Settings Duck', () => {
  it('Should return the initial state', () => {
    expect(
        settingsReducer(undefined, {}),
      ).toEqual({
        byKey: {},
        keys: [],
      });
  });
});
