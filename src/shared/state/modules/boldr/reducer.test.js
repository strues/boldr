import boldrReducer from './reducer';

describe('Boldr Reducer', () => {
  it('Should return the initial state', () => {
    expect(boldrReducer(undefined, {})).toEqual({
      menus: {
        isFetching: false,
        main: {
          attributes: {},
          details: [],
          id: -1,
          name: '',
          restricted: false,
          safeName: '',
          uuid: '',
        },
      },
      settings: {
        all: {},
        ids: [],
        isFetching: false,
        meta: {
          status: -1,
          initialPageLoad: true,
        },
      },
      ui: {
        drawer: false,
        expanded: true,
        isMobile: false,
        layout: 'grid',
        showHeader: true,
        loaded: false,
        visible: true,
        modal: false,
      },
    });
  });
});
