import settingsReducer from './settings';

describe('Settings Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        settingsReducer(undefined, {}),
      ).toEqual({
        all: {},
        ids: [],
        isFetching: false,
      });
  });
});
