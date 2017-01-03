import menuReducer from './menu';

describe('Menu Duck', () => {
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
          details: [{
            id: -1,
            uuid: '',
            label: '',
            name: '',
            attribute: '',
            position: '',
            parent_id: '',
            link: '',
            icon: '',
          }],
        },
      });
  });
});
