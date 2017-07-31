import boldrReducer from './reducer';

describe('Boldr Reducer', () => {
  it('Should return the initial state', () => {
    expect(boldrReducer(undefined, {})).toEqual({
      settings: {
        apolloUri: '/api/v1/graphql',
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
      notifications: [],
    });
  });
});
