import menuReducer from './reducer';

describe('Menu Reducer', () => {
  it('Should return the initial state', () => {
    expect(menuReducer(undefined, {})).toEqual({
      main: {
        id: -1,
        uuid: '',
        name: '',
        safe_name: '',
        attributes: {},
        restricted: false,
        details: [],
      },
    });
  });
});
