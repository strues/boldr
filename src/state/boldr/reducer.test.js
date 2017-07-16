import boldrReducer from './reducer';

describe('Boldr Reducer', () => {
  it('Should return the initial state', () => {
    expect(boldrReducer(undefined, {})).toEqual({
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
        expanded: true,
        isMobile: false,
        layout: 'grid',
        showHeader: true,
        showSidebar: true,
        visible: true,
        modal: false,
      },
    });
  });
});
