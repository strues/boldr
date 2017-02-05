import menuReducer from './menu';

describe('Menu Reducer', () => {
  it('Should return the initial state', () => {
    expect(
        menuReducer(undefined, {}),
      ).toEqual({
        main: {
          id: -1,
          uuid: '',
          name: '',
          label: '',
          attributes: {},
          restricted: false,
          order: -1,
          details: [],
        },
      });
  });
});
